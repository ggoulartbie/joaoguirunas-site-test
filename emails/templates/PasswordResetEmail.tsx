import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Redefinir senha da sua conta</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Redefinir senha</Heading>
          <Text style={text}>
            Olá, {name}. Recebemos uma solicitação para redefinir a senha da sua conta.
            Clique no botão abaixo para criar uma nova senha.
          </Text>
          <Section style={btnSection}>
            <Button href={resetUrl} style={btn}>
              Redefinir senha
            </Button>
          </Section>
          <Text style={warning}>
            Este link expira em 1 hora. Se você não solicitou a redefinição, ignore este email — sua senha permanece a mesma.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Por segurança, nunca compartilhe este link com ninguém.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

PasswordResetEmail.PreviewProps = {
  name: 'João',
  resetUrl: 'http://localhost:3000/redefinir-senha/token-exemplo',
} satisfies PasswordResetEmailProps

const main = {
  backgroundColor: '#050507',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
}

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 16px',
}

const text = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 24px',
}

const btnSection = {
  margin: '24px 0',
}

const btn = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#050507',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
}

const warning = {
  color: 'rgba(255,255,255,0.5)',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0',
}

const hr = {
  borderColor: 'rgba(255,255,255,0.1)',
  margin: '24px 0',
}

const footer = {
  color: 'rgba(255,255,255,0.3)',
  fontSize: '12px',
  margin: '0',
}
