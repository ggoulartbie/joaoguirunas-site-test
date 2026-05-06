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
import { NewMaterialEmail } from '../../../emails/templates/NewMaterialEmail'
import { LiveSessionReminderEmail } from '../../../emails/templates/LiveSessionReminderEmail'
import { CertificateReadyEmail } from '../../../emails/templates/CertificateReadyEmail'
import { WelcomeToCohortEmail } from '../../../emails/templates/WelcomeToCohortEmail'
import { WelcomeInviteEmail } from '../../../emails/templates/WelcomeInviteEmail'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@example.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function sendWelcomeEmail(to: string, name: string) {
  const html = await render(WelcomeEmail({ name, loginUrl: `${APP_URL}/academy/login` }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'Bem-vindo à plataforma',
    html,
  })
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  const html = await render(PasswordResetEmail({ name, resetUrl }))

  return getResend().emails.send({
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
    dashboardUrl: `${APP_URL}/academy/dashboard`,
  }))

  return getResend().emails.send({
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
    updatePaymentUrl: `${APP_URL}/academy/perfil`,
  }))

  return getResend().emails.send({
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
    profileUrl: `${APP_URL}/academy/perfil`,
  }))

  return getResend().emails.send({
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
    dashboardUrl: `${APP_URL}/academy/dashboard`,
  }))

  return getResend().emails.send({
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

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Seu acesso a ${cohortName} expira em ${daysLeft} dias`,
    html,
  })
}

export async function sendNewMaterialEmail(
  to: string,
  name: string,
  cohortName: string,
  materialTitle: string,
  lessonTitle: string,
  dashboardUrl?: string
) {
  const html = await render(NewMaterialEmail({
    name,
    cohortName,
    materialTitle,
    lessonTitle,
    dashboardUrl: dashboardUrl ?? `${APP_URL}/academy/dashboard`,
  }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Novo material disponível — ${cohortName}`,
    html,
  })
}

export async function sendLiveSessionReminderEmail(
  to: string,
  name: string,
  cohortName: string,
  sessionTitle: string,
  scheduledAt: string,
  durationMinutes: number,
  meetingUrl: string | null
) {
  const html = await render(LiveSessionReminderEmail({
    name,
    cohortName,
    sessionTitle,
    scheduledAt,
    durationMinutes,
    meetingUrl,
  }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Lembrete: ${sessionTitle} — amanhã`,
    html,
  })
}

export async function sendWelcomeToCohortEmail(
  to: string,
  name: string,
  cohortName: string,
  startDate: string | null
) {
  const html = await render(WelcomeToCohortEmail({
    name,
    cohortName,
    startDate,
    dashboardUrl: `${APP_URL}/academy/meus-cursos`,
    forumUrl: `${APP_URL}/academy/forum`,
  }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Bem-vindo à turma ${cohortName}!`,
    html,
  })
}

export async function sendCertificateReadyEmail(
  to: string,
  name: string,
  courseName: string,
  cohortName: string,
  verificationCode: string
) {
  const certificateUrl = `${APP_URL}/certificado/v/${verificationCode}`

  const html = await render(CertificateReadyEmail({
    name,
    courseName,
    cohortName,
    certificateUrl,
    verificationCode,
  }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Seu certificado de ${courseName} está pronto`,
    html,
  })
}

export async function sendWelcomeInviteEmail(
  to: string,
  name: string,
  cohortName: string,
  activateUrl: string,
  subject?: string,
) {
  const html = await render(WelcomeInviteEmail({ name, cohortName, activateUrl }))

  return getResend().emails.send({
    from: FROM,
    to,
    subject: subject ?? `Convite de acesso — ${cohortName}`,
    html,
  })
}
