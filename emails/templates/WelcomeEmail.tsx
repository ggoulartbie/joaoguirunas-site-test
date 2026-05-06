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

interface WelcomeEmailProps {
  name: string
  loginUrl: string
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Bem-vindo! Sua conta foi criada com sucesso.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bem-vindo, {name}</Heading>
          <Text style={text}>
            Sua conta foi criada com sucesso. Acesse a plataforma para começar.
          </Text>
          <Section style={btnSection}>
            <Button href={loginUrl} style={btn}>
              Acessar plataforma
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Se você não criou esta conta, ignore este email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

WelcomeEmail.PreviewProps = {
  name: 'João',
  loginUrl: 'http://localhost:3000/login',
} satisfies WelcomeEmailProps

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

const hr = {
  borderColor: 'rgba(255,255,255,0.1)',
  margin: '24px 0',
}

const footer = {
  color: 'rgba(255,255,255,0.3)',
  fontSize: '12px',
  margin: '0',
}
