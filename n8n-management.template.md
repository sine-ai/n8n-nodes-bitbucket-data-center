# n8n Docker Compose Management

## Docker Compose Configuration

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_TRUST_PROXY=1
      - N8N_SECURE_COOKIE=false
      - N8N_PROXY_HOPS=1
      - WEBHOOK_URL=http://localhost:5678
      - N8N_EDITOR_BASE_URL=http://localhost:5678
      - N8N_DISABLE_UI_LOGIN=true
      - N8N_PROXY_HOST=http://localhost:5678
      - N8N_HOST=http://localhost:5678
      - NODE_TLS_REJECT_UNAUTHORIZED=0
      - N8N_COMMUNITY_PACKAGES=n8n-nodes-jira-data-center,n8n-nodes-bitbucket-data-center
      # Disable telemetry to prevent connection errors
      - N8N_DIAGNOSTICS_ENABLED=false
      # Performance optimizations
      - N8N_BLOCK_ENV_ACCESS_IN_NODE=false
      - N8N_RUNNERS_ENABLED=true
      - DB_SQLITE_POOL_SIZE=10
    volumes:
      - n8n_data:/home/node/.n8n
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:5678/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  n8n_data:
    external: true
```

## Quick Commands

### Start n8n
```bash
cd /path/to/your/n8n-nodes-bitbucket-data-center
docker-compose up -d
```

### Stop n8n
```bash
docker-compose down
```

### Restart n8n
```bash
docker-compose restart
```

### View logs
```bash
docker-compose logs -f n8n
```

### Update n8n to latest version
```bash
docker-compose pull
docker-compose up -d
```

### Rebuild with updated package
```bash
docker-compose down
docker-compose up -d --build
```

## Installed Community Packages
- ✅ n8n-nodes-jira-data-center v1.0.0 (with project dropdowns)
- ✅ n8n-nodes-bitbucket-data-center v1.4.0

## Access
- **Web Interface:** http://localhost:5678
- **Container Name:** n8n  
- **Port:** 5678

## Data Persistence
All n8n data is stored in the `n8n_data` Docker volume and will persist across container restarts.

## Configuration Notes
- **Telemetry disabled** (`N8N_DIAGNOSTICS_ENABLED=false`) to prevent connection errors
- **UI login disabled** (`N8N_DISABLE_UI_LOGIN=true`) for easier development access
- **TLS verification disabled** for local HTTPS testing
- **Performance optimizations** enabled (runners, connection pooling)
- **Healthcheck configured** for container monitoring
- **External volume** for persistent data across projects
- **Both community packages** loaded automatically via `N8N_COMMUNITY_PACKAGES`

## Setup Instructions

1. **Copy this template:**
   ```bash
   cp n8n-management.template.md n8n-management.md
   ```

2. **Update paths in your local copy** to match your system

3. **The local copy is gitignored** to keep personal paths private

## Development Tips

### Testing Local Changes
If you're developing locally and want to test your changes:

1. Build your package locally:
   ```bash
   npm run build
   npm pack
   ```

2. Update docker-compose.yml to install from local package:
   ```yaml
   command: >
     /bin/sh -c "
     npm install -g ./n8n-nodes-bitbucket-data-center-*.tgz &&
     n8n start
     "
   ```

3. Mount the package file:
   ```yaml
   volumes:
     - n8n_data:/home/node/.n8n
     - ./n8n-nodes-bitbucket-data-center-*.tgz:/home/node/n8n-nodes-bitbucket-data-center.tgz
   ```
