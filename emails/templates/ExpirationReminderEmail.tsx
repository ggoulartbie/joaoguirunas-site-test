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
            <Text style={styles.monoLabel}>AVISO DE EXPIRAÇÃO</Text>
            <Heading style={styles.heading}>
              Acesso expira em {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'}
            </Heading>
            <Text style={styles.body}>
              Olá, {name}. Seu acesso à turma{' '}
              <strong style={styles.strong}>{cohortName}</strong> expira em{' '}
              <strong style={styles.strong}>{expiryFormatted}</strong>.
            </Text>
            <Text style={styles.body}>
              Renove agora para manter acesso contínuo ao conteúdo pelo preço de
              extensão.
            </Text>
            <Section style={styles.btnWrapper}>
              <Button href={renewUrl} style={styles.button}>
                RENOVAR ACESSO
              </Button>
            </Section>
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Se não quiser renovar, ignore este email. Seu acesso encerrará na
              data indicada.
            </Text>
          </Section>
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
