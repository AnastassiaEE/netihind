import { error, log, time } from 'console';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { env, title } from 'process';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();
    const body = {
      query: `query posts($language: LanguageCodeFilterEnum = ALL) {
  posts(where: {language: $language, orderby: {field: DATE, order: ASC}}) {
    nodes {
      content(format: RAW)
      slug
      date
      title
      featuredImage {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      language {
        code
      }
      excerpt(format: RAW)
    }
  }
}`,
      variables: { language: language },
    };
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.errors) return NextResponse.json({ error: 'Error' }, { status: 400 });
    return NextResponse.json(json.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse body' }, { status: 400 });
  }
}
