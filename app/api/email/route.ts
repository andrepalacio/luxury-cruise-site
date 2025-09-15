import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import EmailTemplate from '@/components/EmailTemplate';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormData {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    description: string;
}

export async function POST(req: Request) {
    try {
        const { from, to, subject, data }: { from: string; to: string; subject: string; data: FormData } = await req.json();

        if (!data || !data.name || !data.last_name || !data.email || !data.phone || !data.description) {
            return NextResponse.json({ error: 'Faltan datos en el formulario' }, { status: 400 });
        }
        const emailHtml = await render(
            React.createElement(EmailTemplate, {
                name: data.name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                description: data.description,
            })
        );

        const { data: resendData, error } = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: emailHtml,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data: resendData }, { status: 200 });
    } catch (error) {
        console.error('API catch error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}