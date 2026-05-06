import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  sessionTitle: string
  scheduledAt: string
  durationMinutes: number
  meetingUrl: string | null
}

export function LiveSessionReminderEmail({ name, cohortName, sessionTitle, scheduledAt, durationMinutes, meetingUrl }: Props) {
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo',
  }).format(new Date(scheduledAt))

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Lembrete: {sessionTitle} começa em 24h</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Encontro ao vivo amanhã</Heading>
          <Text style={text}>
            Olá, {name}. Lembrando que o encontro ao vivo da turma <strong>{cohortName}</strong> acontece amanhã.
          </Text>
          <Text style={text}>
            <strong>{sessionTitle}</strong><br />
            {dateFormatted} · {durationMinutes} min
          </Text>
          {meetingUrl && (
            <Section style={btnSection}>
              <Button href={meetingUrl} style={btn}>
                Entrar no encontro
              </Button>
            </Section>
          )}
          <Hr style={hr} />
          <Text style={footer}>
            Você recebeu este email por ser membro da turma {cohortName}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

LiveSessionReminderEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  sessionTitle: 'Live de Dúvidas — Semana 3',
  scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  durationMinutes: 90,
  meetingUrl: 'https://meet.google.com/abc-defg-hij',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
