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
  email: string
  tempPassword: string
  loginUrl: string
  expiresInMinutes: number
}

export function PasswordResetEmail({
  name,
  email,
  tempPassword,
  loginUrl,
  expiresInMinutes,
}: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Sua senha temporária — Academy</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <table cellPadding="0" cellSpacing="0" style={styles.headerTable}>
            <tbody>
              <tr>
                <td style={styles.logoMark}>JG</td>
                <td style={styles.logoLabel}>ACADEMY</td>
              </tr>
            </tbody>
          </table>

          <Section style={styles.card}>
            <Text style={styles.monoLabel}>SENHA TEMPORÁRIA</Text>
            <Heading style={styles.heading}>Olá, {name}</Heading>
            <Text style={styles.body}>
              Recebemos uma solicitação de redefinição de senha para sua conta. Use as
              credenciais abaixo para entrar. Ao fazer login, você será solicitado a
              criar uma nova senha pessoal.
            </Text>

            <Section style={styles.credBox}>
              <Text style={styles.credLabel}>EMAIL</Text>
              <Text style={styles.credValue}>{email}</Text>
              <Text style={styles.credLabel}>SENHA TEMPORÁRIA</Text>
              <Text style={styles.credValueMono}>{tempPassword}</Text>
            </Section>

            <Section style={styles.btnWrapper}>
              <Button href={loginUrl} style={styles.button}>
                FAZER LOGIN
              </Button>
            </Section>

            <Text style={styles.notice}>
              Esta senha temporária expira em <strong>{expiresInMinutes} minutos</strong>.
              Sua senha atual continua válida — se você se lembrar dela, pode usá-la
              normalmente e ignorar este email.
            </Text>

            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Se não foi você quem solicitou, pode ignorar este email com segurança.
              Sua senha atual permanece inalterada até alguém usar esta senha temporária.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

PasswordResetEmail.PreviewProps = {
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  tempPassword: 'Acad3my-9f8x2p',
  loginUrl: 'http://localhost:3000/academy/login',
  expiresInMinutes: 60,
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
  credBox: {
    backgroundColor: '#050507',
    border: '1px solid rgba(255,58,14,0.25)',
    padding: '20px',
    margin: '20px 0',
  },
  credLabel: {
    color: '#ff3a0e',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '9px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px',
  },
  credValue: {
    color: '#f1f1f3',
    fontSize: '15px',
    margin: '0 0 16px',
    fontWeight: '500',
  },
  credValueMono: {
    color: '#f1f1f3',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '16px',
    margin: '0',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  btnWrapper: {
    margin: '24px 0 16px',
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
  notice: {
    color: 'rgba(241,241,243,0.65)',
    fontSize: '13px',
    lineHeight: '1.55',
    margin: '8px 0 0',
    padding: '12px 14px',
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderLeft: '2px solid #ff3a0e',
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
