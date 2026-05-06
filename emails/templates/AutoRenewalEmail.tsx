import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
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
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Matrícula renovada</Heading>
          <Text style={text}>
            Olá, {name}. Sua matrícula em <strong>{cohortName}</strong> foi renovada com sucesso.
            Seu acesso está garantido até <strong>{expiryFormatted}</strong>.
          </Text>
          <Section style={btnSection}>
            <Button href={profileUrl} style={btn}>
              Ver minha matrícula
            </Button>
          </Section>
          <Text style={hint}>
            Para cancelar a renovação automática, acesse seu perfil.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Dúvidas? Responda este email.
          </Text>
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

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 24px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hint = { color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '20px', margin: '0' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
