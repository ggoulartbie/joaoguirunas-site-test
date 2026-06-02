import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

Font.register({
  family: 'GeistMono',
  src: 'https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7Pq_ROW9AJi8SZwt.woff2',
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'var(--void)',
    padding: 60,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  accentBar: {
    height: 4,
    backgroundColor: 'var(--ember)',
    marginBottom: 48,
  },
  label: {
    fontSize: 8,
    color: '#666666',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: 'var(--ink-2)',
    marginVertical: 24,
  },
  sectionLabel: {
    fontSize: 7,
    color: '#555555',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 13,
    color: '#DDDDDD',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  verificationBlock: {
    flexDirection: 'column',
  },
  verificationCode: {
    fontSize: 9,
    color: 'var(--ember)',
    letterSpacing: 2,
    fontFamily: 'Helvetica-Bold',
  },
  verificationUrl: {
    fontSize: 7,
    color: '#444444',
    marginTop: 2,
  },
  issuedBlock: {
    alignItems: 'flex-end',
  },
  issuedLabel: {
    fontSize: 7,
    color: '#444444',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  issuedDate: {
    fontSize: 10,
    color: '#AAAAAA',
    marginTop: 2,
  },
})

type Props = {
  name: string
  courseName: string
  cohortName: string
  issuedAt: Date
  verificationCode: string
  appUrl?: string
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function CertificatePDF({
  name,
  courseName,
  cohortName,
  issuedAt,
  verificationCode,
  appUrl = 'https://joaoguirunas.com',
}: Props) {
  return (
    <Document
      title={`Certificado — ${courseName}`}
      author="João Guirunas"
      subject={`Certificado de conclusão — ${name}`}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Barra accent */}
        <View style={styles.accentBar} />

        {/* Header */}
        <View>
          <Text style={styles.label}>Certificado de conclusão</Text>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>concluiu com êxito o curso</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Curso</Text>
          <Text style={styles.sectionValue}>{courseName}</Text>

          <Text style={styles.sectionLabel}>Turma</Text>
          <Text style={styles.sectionValue}>{cohortName}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.verificationBlock}>
            <Text style={styles.sectionLabel}>Código de verificação</Text>
            <Text style={styles.verificationCode}>{verificationCode}</Text>
            <Text style={styles.verificationUrl}>
              {appUrl}/certificado/v/{verificationCode}
            </Text>
          </View>

          <View style={styles.issuedBlock}>
            <Text style={styles.issuedLabel}>Emitido em</Text>
            <Text style={styles.issuedDate}>{formatDate(issuedAt)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
