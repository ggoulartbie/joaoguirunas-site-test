import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  courseName: string
  cohortName: string
  certificateUrl: string
  verificationCode: string
}

export function CertificateReadyEmail({ name, courseName, cohortName, certificateUrl, verificationCode }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Seu certificado de {courseName} está pronto</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Certificado disponível</Heading>
          <Text style={text}>
            Parabéns, {name}! Seu certificado de conclusão do curso <strong>{courseName}</strong> ({cohortName}) está pronto.
          </Text>
          <Section style={btnSection}>
            <Button href={certificateUrl} style={btn}>
              Baixar certificado
            </Button>
          </Section>
          <Text style={codeLabel}>Código de verificação</Text>
          <Text style={code}>{verificationCode}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Este certificado pode ser verificado em qualquer momento usando o código acima.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

CertificateReadyEmail.PreviewProps = {
  name: 'João',
  courseName: 'Desenvolvimento de Produto',
  cohortName: 'Mentoria Maio 2026',
  certificateUrl: 'http://localhost:3000/certificado/ABC123',
  verificationCode: 'ABC123',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ffffff', borderRadius: '8px', color: '#050507', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const codeLabel = { color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 4px' }
const code = { color: '#ffffff', fontSize: '18px', fontFamily: 'monospace', fontWeight: '700', letterSpacing: '0.15em', margin: '0 0 24px' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
