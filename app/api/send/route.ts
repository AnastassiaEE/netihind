import EmailTemplate from '@/emails/EmailTemplate';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://netihind.ee',
  'https://test.netihind.ee',
  'https://www.netihind.ee',
  'https://www.test.netihind.ee',
  'http://localhost:3000',
];

const rateLimit = new Map<string, number[]>();
const MAX_REQUESTS = 3;
const TIME_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];

  const recentRequests = requests.filter((time) => now - time < TIME_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);

  if (rateLimit.size > 1000) {
    const oldestEntries = Array.from(rateLimit.entries())
      .sort(([, a], [, b]) => Math.max(...b) - Math.max(...a))
      .slice(500);
    rateLimit.clear();
    oldestEntries.forEach(([key, value]) => rateLimit.set(key, value));
  }

  return true;
}

export async function POST(req: NextRequest) {
  // Проверяем origin
  const origin = req.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  const body = await req.json();
  const { type, ...values } = body;
  try {
    const { data, error } = await resend.emails.send({
      from: 'Netihind <noreply@netihind.ee>',
      to: ['info@netihind.ee'],
      subject: `Netihind. ${type.toUpperCase()}`,
      react: EmailTemplate(type, values),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
