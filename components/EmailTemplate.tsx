import React from 'react';
import { Html, Head, Body, Container, Heading, Text, Section, Hr, Row, Column } from '@react-email/components';

interface EmailTemplateProps {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    description: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, last_name, email, phone, description }) => (
    <Html lang="es">
        <Head />
        <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#34495f', padding: '20px' }}>
            <Container style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Section style={{ textAlign: 'center' }}>
                    <Heading style={{ color: '#34495f', fontSize: '24px' }}>
                        ¡Nuevo Viaje Soñado!
                    </Heading>
                    <Text style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
                        Has recibido un nuevo mensaje de una persona interesada en planear un viaje.
                    </Text>
                </Section>
                <Hr style={{ borderColor: '#ddd', margin: '20px 0' }} />
                
                <Section style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Datos de contacto:</Text>
                    <Row style={{ marginBottom: '5px' }}>
                        <Column><Text style={{ color: '#555', fontWeight: 'bold' }}>Nombre Completo:</Text></Column>
                        <Column><Text style={{ color: '#555', textAlign: 'right' }}>{name} {last_name}</Text></Column>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Column><Text style={{ color: '#555', fontWeight: 'bold' }}>Email:</Text></Column>
                        <Column><Text style={{ color: '#555', textAlign: 'right' }}>{email}</Text></Column>
                    </Row>
                    <Row>
                        <Column><Text style={{ color: '#555', fontWeight: 'bold' }}>Celular:</Text></Column>
                        <Column><Text style={{ color: '#555', textAlign: 'right' }}>{phone}</Text></Column>
                    </Row>
                </Section>

                <Hr style={{ borderColor: '#ddd', margin: '20px 0' }} />

                <Section style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Descripción del viaje:</Text>
                    <Text style={{ color: '#555', fontSize: '16px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {description}
                    </Text>
                </Section>

                <Hr style={{ borderColor: '#ddd', margin: '20px 0' }} />
                <Section style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
                    <Text>
                        Este correo fue enviado automáticamente desde tu formulario de contacto.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default EmailTemplate;