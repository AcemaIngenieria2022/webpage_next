import ChannelReportForm from '@/components/shared/ChannelReportForm/ChannelReportForm';

export const metadata = {
  title: 'Acoso sexual - ACEMA Ingeniería',
  description: 'Canal para reportar situaciones de acoso sexual en el lugar de trabajo.',
};

export default function AcosoSexualPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f1f1f1' }}>
      <ChannelReportForm
        title="Acoso sexual"
        channel="Acoso sexual"
        intro={
          <>
            <p>
              Es una conducta de naturaleza sexual que se realiza en el lugar de trabajo y que genera un ambiente
              hostil u ofensivo. Este tipo de acoso puede ser verbal, físico o no verbal, y puede incluir:
            </p>
            <ul>
              <li>Avances sexuales indeseados</li>
              <li>Solicitudes de favores sexuales</li>
              <li>Comentarios ofensivos sobre el sexo de la persona</li>
              <li>Exhibición de fotos sexualmente sugestivas o pornográficas</li>
              <li>Miradas impúdicas</li>
              <li>Silbidos o gestos que hacen pensar en el sexo</li>
            </ul>
          </>
        }
      />
    </main>
  );
}
