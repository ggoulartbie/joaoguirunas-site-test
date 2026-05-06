import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  materialTitle: string
  lessonTitle: string
  dashboardUrl: string
}

export function NewMaterialEmail({ name, cohortName, materialTitle, lessonTitle, dashboardUrl }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Novo material disponível em {cohortName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Novo material disponível</Heading>
          <Text style={text}>
            Olá, {name}. Um novo material foi adicionado à turma <strong>{cohortName}</strong>.
          </Text>
          <Text style={text}>
            <strong>{materialTitle}</strong> está disponível na aula <strong>{lessonTitle}</strong>.
          </Text>
          <Section style={btnSection}>
            <Button href={dashboardUrl} style={btn}>
              Acessar material
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Você recebeu este email por ser membro da turma {cohortName}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

NewMaterialEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  materialTitle: 'Slides da Aula 3',
  lessonTitle: 'Fundamentos de Produto',
  dashboardUrl: 'http://localhost:3000/dashboard',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
