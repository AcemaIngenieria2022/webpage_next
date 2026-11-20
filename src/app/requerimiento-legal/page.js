import ChannelReportForm from '@/components/shared/ChannelReportForm/ChannelReportForm';

export const metadata = {
  title: 'Requerimiento legal - ACEMA Ingeniería',
  description: 'Canal para radicar requerimientos y notificaciones legales.',
};

export default function RequerimientoLegalPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f1f1f1' }}>
      <ChannelReportForm
        title="Requerimiento legal"
        channel="Requerimiento legal"
        variant="legal"
      />
    </main>
  );
}
