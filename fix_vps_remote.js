const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const script = `
    cd /var/www/bkcarreracademy &&
    echo "=== UPDATING GIT REMOTE ON VPS ===" &&
    git remote set-url origin https://github.com/sakshitidme/bkcarreracademy.git &&
    git remote -v &&
    echo "=== FETCHING AND RESETTING TO LATEST MAIN ===" &&
    git fetch origin &&
    git reset --hard origin/main &&
    echo "=== BUILDING FRONTEND ===" &&
    cd frontend && npm install && npm run build &&
    echo "=== RESTARTING BACKEND ===" &&
    cd ../backend && npm install && node seed_upsc.js && pm2 restart bkacademy-backend
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
