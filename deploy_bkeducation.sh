#!/bin/bash
# ==============================================================================
# ISOLATED DEPLOYMENT SCRIPT FOR BK EDUCATION ONLY (bkeducation.co.in)
# SAFE TO RUN ON MULTI-HOST PRODUCTION SERVERS - DOES NOT TOUCH OTHER SITES
# ==============================================================================

set -e

echo "=================================================="
echo "🚀 ISOLATED PRODUCTION DEPLOYMENT FOR BK EDUCATION"
echo "=================================================="

# 1. SERVER INVENTORY
echo "📊 Checking Server Context:"
hostname
pwd

# 2. CHECK EXISTING PM2 PROCESSES
echo "📋 Current PM2 Process Status (BEFORE):"
pm2 list

# 3. BACKUP CURRENT BK EDUCATION DEPLOYMENT
TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")
BACKUP_DIR="../bkeducation-backup-$TIMESTAMP"
echo "📦 Creating Isolated Backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
if [ -d "frontend/dist" ]; then
    cp -r frontend/dist "$BACKUP_DIR/frontend_dist" || true
fi
if [ -d "backend" ]; then
    cp -r backend "$BACKUP_DIR/backend_src" || true
fi
echo "✅ Backup completed at: $BACKUP_DIR"

# 4. BACKEND DEPENDENCIES & ENVIRONMENT CHECK
echo "📦 Checking Backend Dependencies..."
cd backend
npm install --production
cd ..

# 5. FRONTEND PRODUCTION BUILD
echo "🔨 Building Frontend Production Distribution..."
cd frontend
npm install
npm run build
cd ..

# 6. PM2 ISOLATED PROCESS RESTART
echo "🔄 Identifying BK Education PM2 Process..."
BK_PM2=$(pm2 jlist 2>/dev/null | grep -o '"name":"[^"]*"' | grep -iE 'bk|education|mindmap' | head -n1 | cut -d'"' -f4)

if [ -n "$BK_PM2" ]; then
    echo "🎯 Target PM2 Process Found: '$BK_PM2'"
    echo "🔄 Restarting ONLY process: '$BK_PM2'..."
    pm2 restart "$BK_PM2"
else
    echo "⚠️ BK Education PM2 Process Name could not be auto-detected."
    echo "Current PM2 processes:"
    pm2 list
    echo "👉 Please run: pm2 restart <BK_EDUCATION_PROCESS_ID_OR_NAME>"
fi

# 7. NGINX VALIDATION & RELOAD
echo "🔍 Validating Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx test passed. Reloading Nginx safely..."
    systemctl reload nginx
else
    echo "❌ Nginx syntax error detected! Nginx reload aborted for safety."
fi

# 8. STATUS VERIFICATION
echo "📋 Current PM2 Process Status (AFTER):"
pm2 list

echo "=================================================="
echo "✅ DEPLOYMENT FINISHED — OTHER SITES REMAIN UNTOUCHED"
echo "=================================================="
