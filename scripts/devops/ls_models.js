const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('ls -la /var/www/bkcarreracademy/backend/models', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', (code, signal) => {
      console.log('OUTPUT:\n', out);
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
