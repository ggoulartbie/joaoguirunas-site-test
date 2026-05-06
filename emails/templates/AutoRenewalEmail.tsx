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
  newExpiresAt: string
  profileUrl: string
}

export function AutoRenewalEmail({ name, cohortName, newExpiresAt, profileUrl }: Props) {
  const expiryFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).format(new Date(newExpiresAt))

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Sua matrícula foi renovada automaticamente</Preview>
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
            <Text style={styles.monoLabel}>RENOVAÇÃO AUTOMÁTICA</Text>
            <Heading style={styles.heading}>Matrícula renovada</Heading>
            <Text style={styles.body}>
              Olá, {name}. Sua matrícula em{' '}
              <strong style={styles.strong}>{cohortName}</strong> foi renovada com
              sucesso. Seu acesso está garantido até{' '}
              <strong style={styles.strong}>{expiryFormatted}</strong>.
            </Text>
            <Section style={styles.btnWrapper}>
              <Button href={profileUrl} style={styles.button}>
                VER MINHA MATRÍCULA
              </Button>
            </Section>
            <Text style={styles.hint}>
              Para cancelar a renovação automática, acesse seu perfil.
            </Text>
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Dúvidas? Responda este email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

AutoRenewalEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  newExpiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
  profileUrl: 'http://localhost:3000/perfil',
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
    margin: '0 0 24px',
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
  hint: {
    color: 'rgba(241,241,243,0.55)',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
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
