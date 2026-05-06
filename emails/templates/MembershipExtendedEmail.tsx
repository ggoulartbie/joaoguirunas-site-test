import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  newExpiresAt: string
  dashboardUrl: string
}

export function MembershipExtendedEmail({ name, cohortName, newExpiresAt, dashboardUrl }: Props) {
  const expiryFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).format(new Date(newExpiresAt))

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Sua matrícula em {cohortName} foi estendida</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Matrícula estendida!</Heading>
          <Text style={text}>
            Olá, {name}. Seu acesso à turma <strong>{cohortName}</strong> foi estendido com sucesso.
            Você tem acesso garantido até <strong>{expiryFormatted}</strong>.
          </Text>
          <Section style={btnSection}>
            <Button href={dashboardUrl} style={btn}>
              Acessar conteúdo
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Dúvidas? Responda este email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

MembershipExtendedEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Online Padrão',
  newExpiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
  dashboardUrl: 'http://localhost:3000/dashboard',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 24px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
