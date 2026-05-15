const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('cd /var/www/bkcarreracademy && git fetch origin && git reset --hard origin/main && cd frontend && npm install && npm run build && cd .. && pm2 restart bkacademy-backend', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', (code, signal) => {
      console.log('OUTPUT:', out);
      conn.end();
    }).on('data', (data) => {
      out += data;
    }).stderr.on('data', (data) => {
      console.error('STDERR: ' + data);
    });
  });
}).connect({
  host: '147.93.30.234',
  port: 22,
  username: 'root',
  password: 'Bhagwan@3962'
});
