import { FormType } from '@/types/elements.types';
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';
import colors from 'tailwindcss/colors';

const labels: { [key: string]: string } = {
  name: 'Nimi',
  email: 'E-post',
  phone: 'Telefon',
  message: 'Sõnum',
  time: 'Aeg',
  policy: 'Kas olete nõus privaatsuspoliitikaga?',
  address: 'Aadress',
  'call-time': 'Kontaktaeg',
};

export default function EmailTemplate(
  type: FormType,
  values: { [key: string]: string },
) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              'muted-dark': colors.slate['600'],
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="Manrope"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Contact</Preview>
        <Body>
          <Container>
            <Img
              src="https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png"
              width={100}
            />
            <Hr />
            <Heading className="capitalize"> {type} </Heading>
            {Object.keys(values).map((field) => (
              <Text
                key={values[field]}
                className="text-base leading-none text-muted-dark"
              >
                <strong>{labels[field] ?? field}: </strong>
                {values[field].toString()}
              </Text>
            ))}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
