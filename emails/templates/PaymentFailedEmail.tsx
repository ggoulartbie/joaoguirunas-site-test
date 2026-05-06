import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'

interface Props {
  name: string
  cohortName: string
  updatePaymentUrl: string
}

export function PaymentFailedEmail({ name, cohortName, updatePaymentUrl }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Problema no pagamento da sua renovação</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Problema no pagamento</Heading>
          <Text style={text}>
            Olá, {name}. Não foi possível processar o pagamento de renovação para{' '}
            <strong>{cohortName}</strong>.
          </Text>
          <Text style={text}>
            Sua matrícula está temporariamente suspensa. Atualize seu método de
            pagamento para manter o acesso.
          </Text>
          <Section style={btnSection}>
            <Button href={updatePaymentUrl} style={btn}>
              Atualizar pagamento
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Se tiver dúvidas, responda este email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

PaymentFailedEmail.PreviewProps = {
  name: 'João',
  cohortName: 'Mentoria Maio 2026',
  updatePaymentUrl: 'http://localhost:3000/perfil',
} satisfies Props

const main = { backgroundColor: '#050507', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0 0 16px' }
const text = { color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' }
const btnSection = { margin: '24px 0' }
const btn = { backgroundColor: '#ef4444', borderRadius: '8px', color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }
const hr = { borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }
const footer = { color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '0' }
