const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const script = `
    echo "=== CLEANING UP PM2 ===" &&
    pm2 delete all &&
    echo "=== FIXING BACKEND ENV ===" &&
    cd /var/www/bkcarreracademy/backend &&
    cp -n .env.example .env || true &&
    sed -i 's/dummy_id/rzp_test_dummy/' .env &&
    sed -i 's/dummy_secret/dummy_secret_key/' .env &&
    echo "RAZORPAY_KEY_ID=rzp_test_dummy" >> .env &&
    echo "RAZORPAY_KEY_SECRET=dummy_secret_key" >> .env &&
    echo "=== INSTALLING DEPS & STARTING BACKEND ===" &&
    npm install &&
    pm2 start server.js --name bkacademy-backend &&
    pm2 save &&
    sleep 3 &&
    pm2 status &&
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
