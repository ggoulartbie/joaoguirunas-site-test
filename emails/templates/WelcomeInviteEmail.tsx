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
}

export function WelcomeInviteEmail({ name, cohortName, activateUrl }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Ative sua conta — {cohortName}</Preview>
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
            <Text style={styles.monoLabel}>CONVITE DE ACESSO</Text>
            <Heading style={styles.heading}>Olá, {name}</Heading>
            <Text style={styles.body}>
              Você foi adicionado à turma{' '}
              <strong style={styles.strong}>{cohortName}</strong>. Clique no botão abaixo
              para activar sua conta e começar.
            </Text>
            <Text style={styles.body}>
              O link é de uso único e expira em 24 horas.
            </Text>
            <Section style={styles.btnWrapper}>
              <Button href={activateUrl} style={styles.buttonPrimary}>
                ACTIVAR MINHA CONTA
              </Button>
            </Section>
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
