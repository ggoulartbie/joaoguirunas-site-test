import 'server-only'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from '../../../emails/templates/WelcomeEmail'
import { PasswordResetEmail } from '../../../emails/templates/PasswordResetEmail'
import { PaymentApprovedEmail } from '../../../emails/templates/PaymentApprovedEmail'
import { PaymentFailedEmail } from '../../../emails/templates/PaymentFailedEmail'
import { AutoRenewalEmail } from '../../../emails/templates/AutoRenewalEmail'
import { ExpirationReminderEmail } from '../../../emails/templates/ExpirationReminderEmail'
import { MembershipExtendedEmail } from '../../../emails/templates/MembershipExtendedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@example.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function sendWelcomeEmail(to: string, name: string) {
  const html = await render(WelcomeEmail({ name, loginUrl: `${APP_URL}/login` }))

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

export async function sendPaymentApprovedEmail(to: string, name: string, cohortName: string) {
  const html = await render(PaymentApprovedEmail({
    name,
    cohortName,
    dashboardUrl: `${APP_URL}/dashboard`,
  }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Acesso liberado — ${cohortName}`,
    html,
  })
}

export async function sendPaymentFailedEmail(to: string, name: string, cohortName: string) {
  const html = await render(PaymentFailedEmail({
    name,
    cohortName,
    updatePaymentUrl: `${APP_URL}/perfil`,
  }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Problema no pagamento da sua renovação',
    html,
  })
}

export async function sendAutoRenewalEmail(
  to: string,
  name: string,
  cohortName: string,
  newExpiresAt: string
) {
  const html = await render(AutoRenewalEmail({
    name,
    cohortName,
    newExpiresAt,
    profileUrl: `${APP_URL}/perfil`,
  }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Matrícula renovada — ${cohortName}`,
    html,
  })
}

export async function sendMembershipExtendedEmail(
  to: string,
  name: string,
  cohortName: string,
  newExpiresAt: string
) {
  const html = await render(MembershipExtendedEmail({
    name,
    cohortName,
    newExpiresAt,
    dashboardUrl: `${APP_URL}/dashboard`,
  }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Acesso estendido — ${cohortName}`,
    html,
  })
}

export async function sendExpirationReminderEmail(
  to: string,
  name: string,
  cohortName: string,
  daysLeft: number,
  expiresAt: string,
  renewUrl: string
) {
  const html = await render(ExpirationReminderEmail({
    name,
    cohortName,
    daysLeft,
    expiresAt,
    renewUrl,
  }))

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Seu acesso a ${cohortName} expira em ${daysLeft} dias`,
    html,
  })
}
