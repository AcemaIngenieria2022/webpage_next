import ChannelReportForm from '@/components/shared/ChannelReportForm/ChannelReportForm';
import styles from '@/components/shared/PqrForm/PqrForm.module.css';

export const metadata = {
  title: 'Acoso laboral y discriminación - ACEMA Ingeniería',
  description: 'Canal para reportar situaciones de acoso laboral y discriminación.',
};

export default function AcosoLaboralPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f1f1f1' }}>
      <ChannelReportForm
        title="Acoso laboral y discriminación"
        channel="Acoso laboral"
        intro={
          <p className={styles.channelIntroCentered}>
            Es toda conducta persistente y demostrable, ejercida sobre un empleado, trabajador por parte de un
            empleador, un jefe o superior jerárquico inmediato o mediato, un compañero de trabajo o un subalterno,
            encaminada a infundir miedo, intimidación, terror y angustia, a causar perjuicio laboral, generar
            desmotivación en el trabajo, o inducir la renuncia del mismo, según el artículo 2° de la Ley 1010 del 2006.
          </p>
        }
      />
    </main>
  );
}
