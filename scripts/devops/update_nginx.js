const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const script = `
    echo "=== BACKING UP NGINX CONFIGS ===" &&
    cp /etc/nginx/sites-available/bkgurukul /etc/nginx/sites-available/bkgurukul.bak &&
    cp /etc/nginx/sites-available/bkgroupofeducation /etc/nginx/sites-available/bkgroupofeducation.bak &&
    echo "=== UPDATING BKGURUKUL ===" &&
    sed -i 's/server_name bkgurukul.in www.bkgurukul.in 147.93.30.234;/server_name bkgurukul.in www.bkgurukul.in;/g' /etc/nginx/sites-available/bkgurukul &&
    echo "=== UPDATING BKGROUPOFEDUCATION ===" &&
    cat << 'EOF' > /etc/nginx/sites-available/bkgroupofeducation
server {
    server_name bkeducation.co.in www.bkeducation.co.in;
    root /var/www/bkcarreracademy/frontend/dist;
    index index.html index.htm;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/bkeducation.co.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/bkeducation.co.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.bkeducation.co.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = bkeducation.co.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name bkeducation.co.in www.bkeducation.co.in;
    return 404; # managed by Certbot
}

server {
    listen 80;
    server_name bkeducation.in www.bkeducation.in 147.93.30.234;
    root /var/www/bkcarreracademy/frontend/dist;
    index index.html index.htm;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
    echo "=== TESTING NGINX ===" &&
    nginx -t &&
    echo "=== RELOADING NGINX ===" &&
    systemctl reload nginx
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
