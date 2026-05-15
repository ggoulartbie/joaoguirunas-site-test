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
  activateUrl: string
  email?: string
  tempPassword?: string
}

export function WelcomeInviteEmail({ name, cohortName, activateUrl, email, tempPassword }: Props) {
  const hasCredentials = !!(email && tempPassword)
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Acesso liberado — {cohortName}</Preview>
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
            <Text style={styles.monoLabel}>ACESSO LIBERADO</Text>
            <Heading style={styles.heading}>Olá, {name}</Heading>
            <Text style={styles.body}>
              Você foi adicionado à turma{' '}
              <strong style={styles.strong}>{cohortName}</strong>.
            </Text>

            {hasCredentials ? (
              <>
                <Text style={styles.body}>
                  Use as credenciais abaixo para fazer login. No primeiro acesso, você
                  será solicitado a criar uma nova senha pessoal.
                </Text>
                <Section style={styles.credBox}>
                  <Text style={styles.credLabel}>EMAIL</Text>
                  <Text style={styles.credValue}>{email}</Text>
                  <Text style={styles.credLabel}>SENHA TEMPORÁRIA</Text>
                  <Text style={styles.credValueMono}>{tempPassword}</Text>
                </Section>
                <Section style={styles.btnWrapper}>
                  <Button href={activateUrl} style={styles.buttonPrimary}>
                    FAZER LOGIN
                  </Button>
                </Section>
              </>
            ) : (
              <>
                <Text style={styles.body}>
                  Clique no botão abaixo para acessar a plataforma.
                </Text>
                <Section style={styles.btnWrapper}>
                  <Button href={activateUrl} style={styles.buttonPrimary}>
                    ACESSAR ACADEMY
                  </Button>
                </Section>
              </>
            )}

            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Se não esperava este email, pode ignorá-lo com segurança. Para dúvidas,
              responda esta mensagem.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

WelcomeInviteEmail.PreviewProps = {
  name: 'Maria Silva',
  cohortName: 'Mentoria Maio 2026',
  activateUrl: 'http://localhost:3000/academy/login',
  email: 'maria@exemplo.com',
  tempPassword: 'Acad3my-9f8x2p',
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
    margin: '24px 0 8px',
  },
  buttonPrimary: {
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
