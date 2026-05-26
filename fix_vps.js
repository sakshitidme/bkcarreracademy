const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const script = `
    echo "=== FIXING PM2 ==="
    # Change into correct directory
    cd /var/www/bkcarreracademy/backend

    # Create correct .env file
    echo "PORT=3001" > .env
    echo "MONGODB_URI=mongodb://localhost:27017/integrated_portal_db" >> .env
    echo "JWT_SECRET=super_secret_jwt_key_2026" >> .env
    echo "RAZORPAY_KEY_ID=rzp_live_SUYpNkNbUNgC9A" >> .env
    echo "RAZORPAY_KEY_SECRET=AKRGkSxjRvogqGHf2hT1gKZy" >> .env

    # Delete the old 'backend' if it points to wrong path
    pm2 delete backend || true

    # Start the correct one
    pm2 start server.js --name "backend" --update-env

    # Save
    pm2 save --force

    # Restart Nginx
    systemctl restart nginx

    echo "=== NEW STATUS ==="
    pm2 status
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
