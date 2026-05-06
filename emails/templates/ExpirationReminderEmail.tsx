import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  daysLeft: number
  expiresAt: string
  renewUrl: string
}

export function ExpirationReminderEmail({ name, cohortName, daysLeft, expiresAt, renewUrl }: Props) {
  const expiryFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).format(new Date(expiresAt))

  const urgency = daysLeft <= 3 ? 'Urgente: ' : ''

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{urgency}Seu acesso a {cohortName} expira em {String(daysLeft)} dias</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Seu acesso expira em {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'}
          </Heading>
          <Text style={text}>
            Olá, {name}. Seu acesso à turma <strong>{cohortName}</strong> expira em{' '}
            <strong>{expiryFormatted}</strong>.
          </Text>
          <Text style={text}>
            Renove agora para manter acesso contínuo ao conteúdo pelo preço de extensão.
          </Text>
          <Section style={btnSection}>
            <Button href={renewUrl} style={btn}>
              Renovar acesso
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Se não quiser renovar, ignore este email. Seu acesso encerrará na data indicada.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

ExpirationReminderEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  daysLeft: 7,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  renewUrl: 'http://localhost:3000/perfil',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
