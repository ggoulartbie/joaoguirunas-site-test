import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  startDate: string | null
  dashboardUrl: string
  forumUrl: string
}

export function WelcomeToCohortEmail({ name, cohortName, startDate, dashboardUrl, forumUrl }: Props) {
  const formattedStart = startDate
    ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(startDate))
    : null

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Bem-vindo à turma {cohortName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bem-vindo à turma!</Heading>
          <Text style={text}>
            Olá, {name}. Sua vaga em <strong>{cohortName}</strong> está confirmada.
            {formattedStart ? ` As aulas começam em ${formattedStart}.` : ''}
          </Text>
          <Text style={text}>
            Acesse a área do aluno para ver o conteúdo disponível, interagir com a comunidade e acompanhar sua evolução.
          </Text>
          <Section style={btnSection}>
            <Button href={dashboardUrl} style={btnPrimary}>
              Acessar minha turma
            </Button>
          </Section>
          <Section style={btnSection}>
            <Button href={forumUrl} style={btnSecondary}>
              Ver comunidade
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Se tiver qualquer dúvida, responda este email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

WelcomeToCohortEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  startDate: '2026-05-12',
  dashboardUrl: 'http://localhost:3000/meus-cursos',
  forumUrl: 'http://localhost:3000/forum',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '12px 0' }
const btnPrimary = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const btnSecondary = { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
