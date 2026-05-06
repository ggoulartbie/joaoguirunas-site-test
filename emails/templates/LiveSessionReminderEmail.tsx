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
      <Body style={styles.main}>
        <Container style={styles.container}>
          {/* Header */}
          <table cellPadding="0" cellSpacing="0" style={styles.headerTable}>
            <tbody>
              <tr>
                <td style={styles.logoMark}>JG</td>
                <td style={styles.logoLabel}>ACADEMY</td>
              </tr>
            </tbody>
          </table>

          {/* Card */}
          <Section style={styles.card}>
            <Text style={styles.monoLabel}>ENCONTRO AO VIVO</Text>
            <Heading style={styles.heading}>Amanhã tem live</Heading>
            <Text style={styles.body}>
              Olá, {name}. Lembrando que o encontro ao vivo da turma{' '}
              <strong style={styles.strong}>{cohortName}</strong> acontece amanhã.
            </Text>
            <Text style={styles.sessionInfo}>
              <strong style={styles.strong}>{sessionTitle}</strong>
              <br />
              <span style={styles.sessionMeta}>{dateFormatted} · {durationMinutes} min</span>
            </Text>
            {meetingUrl && (
              <Section style={styles.btnWrapper}>
                <Button href={meetingUrl} style={styles.button}>
                  ENTRAR NO ENCONTRO
                </Button>
              </Section>
            )}
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Você recebeu este email por ser membro da turma {cohortName}.
            </Text>
          </Section>
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

const styles = {
  main: {
    backgroundColor: '#050507',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '560px',
  },
  headerTable: {
    marginBottom: '24px',
    borderCollapse: 'collapse' as const,
  },
  logoMark: {
    color: '#ff3a0e',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '18px',
    fontWeight: '700',
    paddingRight: '8px',
    verticalAlign: 'middle',
  },
  logoLabel: {
    color: 'rgba(241,241,243,0.4)',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '9px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    verticalAlign: 'middle',
  },
  card: {
    backgroundColor: '#0e0e11',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '40px',
  },
  monoLabel: {
    color: '#ff3a0e',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    margin: '0 0 20px',
  },
  heading: {
    color: '#f1f1f3',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '36px',
    fontWeight: '300',
    fontStyle: 'italic',
    lineHeight: '1.2',
    margin: '0 0 20px',
  },
  body: {
    color: '#f1f1f3',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  },
  strong: {
    color: '#f1f1f3',
    fontWeight: '600',
  },
  sessionInfo: {
    color: '#f1f1f3',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 8px',
  },
  sessionMeta: {
    color: 'rgba(241,241,243,0.55)',
    fontSize: '13px',
  },
  btnWrapper: {
    margin: '24px 0',
  },
  button: {
    backgroundColor: '#ff3a0e',
    color: '#050507',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    padding: '14px 28px',
    borderRadius: '0',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hr: {
    borderColor: 'rgba(255,255,255,0.07)',
    margin: '24px 0',
  },
  footer: {
    color: 'rgba(241,241,243,0.35)',
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '0',
  },
}
