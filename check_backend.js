const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const script = `
    echo "=== PM2 LOGS (backend) ===" &&
    pm2 logs backend --lines 30 --nostream &&
    echo "=== RESTARTING BACKEND ===" &&
    pm2 restart backend &&
    sleep 2 &&
    echo "=== NETSTAT 3001 ===" &&
    netstat -tlnp | grep 3001
  `;
  conn.exec(script, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', (code, signal) => {
      console.log('OUTPUT:\n', out);
      conn.end();
    }).on('data', (data) => {
      out += data;
      process.stdout.write(data);
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
