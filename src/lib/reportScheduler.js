import cron from 'node-cron';
import { sendWeeklyDatabaseReportEmail } from './mailer';

const REPORT_SCHEDULE = process.env.REPORT_CRON || '0 1 * * 1-5';
const REPORT_TIMEZONE = process.env.REPORT_TIMEZONE || 'America/Bogota';

const scheduleWeeklyReport = () => {
  if (globalThis.__acemaWeeklyReportJob) {
    return globalThis.__acemaWeeklyReportJob;
  }

  const job = cron.schedule(
    REPORT_SCHEDULE,
    async () => {
      try {
        const result = await sendWeeklyDatabaseReportEmail({
          to: process.env.EMAIL_TO_INFO || process.env.EMAIL_TO_REPORTES || process.env.EMAIL_TO_CONTACTO,
          cc: process.env.EMAIL_CC_REPORTS || 'OperacionesTI@acemaingenieria.com',
          days: 7,
        });

        if (!result.ok) {
          console.error('[REPORT SCHEDULER] Error enviando consolidado programado:', result.results);
          return;
        }

        console.log('[REPORT SCHEDULER] Consolidado programado enviado correctamente.');
      } catch (error) {
        console.error('[REPORT SCHEDULER] Error inesperado en el job programado:', error);
      }
    },
    {
      scheduled: true,
      timezone: REPORT_TIMEZONE,
    }
  );

  globalThis.__acemaWeeklyReportJob = job;
  console.log(`[REPORT SCHEDULER] Job programado: ${REPORT_SCHEDULE} (${REPORT_TIMEZONE}).`);
  return job;
};

scheduleWeeklyReport();

export default scheduleWeeklyReport;
