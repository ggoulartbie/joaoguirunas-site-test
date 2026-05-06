import 'server-only'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from '../../../emails/templates/WelcomeEmail'
import { PasswordResetEmail } from '../../../emails/templates/PasswordResetEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@example.com'

export async function sendWelcomeEmail(to: string, name: string) {
  const html = await render(WelcomeEmail({ name, loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login` }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Bem-vindo à plataforma',
    html,
  })
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  const html = await render(PasswordResetEmail({ name, resetUrl }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Redefinir sua senha',
    html,
  })
}
