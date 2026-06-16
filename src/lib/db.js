import mysql from 'mysql2/promise';

export const pool = mysql.createPool({

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT || 3306),

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

  enableKeepAlive: true,

  keepAliveInitialDelay: 10000

});


pool.on('connection', () => {
  console.log('MySQL conectado correctamente');
});


pool.on('error', (err) => {

  console.error(
    '[MYSQL POOL ERROR]:',
    err.message
  );

});


export default pool;