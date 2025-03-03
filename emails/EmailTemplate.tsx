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
import gradientmainlogo from '@/public/images/gradientmainlogo.png';

const baseUrl = 'https://netihind.ee';
const labels: { [key: string]: string } = {
    name: 'Nimi',
    email: 'E-post',
    phone: 'Telefon',
    message: 'Sõnum',
    time: 'Aeg',
    policy: 'Kas olete nõus privaatsuspoliitikaga?',
    address: 'Aadress',
};

export default function EmailTemplate(
    type: 'contact' | 'connection' | 'consultation',
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
                        <Img src={`${baseUrl}${gradientmainlogo.src}`} width={100} height={50} />
                        <Hr />
                        <Heading className="capitalize"> {type} </Heading>
                        {Object.keys(values).map((field) => (
                            <Text key={values[field]} className="text-base text-muted-dark leading-none">
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
