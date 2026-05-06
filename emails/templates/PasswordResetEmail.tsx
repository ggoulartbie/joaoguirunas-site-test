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
      <Preview>Redefinir senha da sua conta JG Academy</Preview>
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
            <Text style={styles.monoLabel}>SEGURANÇA</Text>
            <Heading style={styles.heading}>Redefinir senha</Heading>
            <Text style={styles.body}>
              Olá, {name}. Recebemos uma solicitação para redefinir a senha da
              sua conta. Clique no botão abaixo para criar uma nova senha.
            </Text>
            <Section style={styles.btnWrapper}>
              <Button href={resetUrl} style={styles.button}>
                REDEFINIR SENHA
              </Button>
            </Section>
            <Text style={styles.warning}>
              Este link expira em 1 hora. Se você não solicitou a redefinição,
              ignore este email — sua senha permanece a mesma.
            </Text>
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Por segurança, nunca compartilhe este link com ninguém.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

PasswordResetEmail.PreviewProps = {
  name: 'João',
  resetUrl: 'http://localhost:3000/redefinir-senha/token-exemplo',
} satisfies PasswordResetEmailProps

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
  warning: {
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
