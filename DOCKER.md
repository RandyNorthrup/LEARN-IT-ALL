# LEARN-IT-ALL Docker Setup

This project includes Docker support for containerized deployment.

## Quick Start

### Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`

### Build Docker Image Manually

```bash
# Build the image
docker build -t learn-it-all:latest .

# Run the container
docker run -p 3000:3000 \
  -v $(pwd)/database:/app/database \
  -v $(pwd)/content:/app/content \
  --name learn-it-all \
  learn-it-all:latest
```

## GitHub Container Registry

Docker images are automatically built and pushed to GitHub Container Registry (ghcr.io) when code is pushed to the main branch.

### Pull from GitHub Container Registry

```bash
# Pull the latest image
docker pull ghcr.io/randynorthrup/learn-it-all:latest

# Run from registry
docker run -p 3000:3000 \
  -v $(pwd)/database:/app/database \
  ghcr.io/randynorthrup/learn-it-all:latest
```

### Available Tags

- `latest` - Latest build from main branch
- `main` - Latest build from main branch
- `sha-<commit>` - Specific commit builds
- `v*.*.*` - Semantic version tags

## Configuration

### Environment Variables

- `NODE_ENV` - Set to `production` (default in Docker)
- `DATABASE_URL` - SQLite database path (default: `file:./database/learn-it-all.db`)
- `PORT` - Server port (default: `3000`)
- `HOSTNAME` - Server hostname (default: `0.0.0.0`)

### Volume Mounts

**Database Persistence** (Required):
```bash
-v $(pwd)/database:/app/database
```

**Content Directory** (Optional):
```bash
-v $(pwd)/content:/app/content
```

## Health Check

The container includes a health check endpoint:
- URL: `http://localhost:3000/api/health`
- Interval: 30 seconds
- Timeout: 10 seconds

Check container health:
```bash
docker ps
# or
docker inspect --format='{{.State.Health.Status}}' learn-it-all
```

## Multi-Architecture Support

The Docker image is built for multiple architectures:
- `linux/amd64` (x86_64)
- `linux/arm64` (Apple Silicon, ARM servers)

## Development

### Local Testing

```bash
# Build the image locally
docker build -t learn-it-all:dev .

# Run with development volume mounts
docker-compose up
```

### Image Size Optimization

The Dockerfile uses multi-stage builds to minimize image size:
- Base dependencies layer
- Build layer (discarded after build)
- Minimal runtime layer with only necessary files

## Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs learn-it-all
# or
docker logs learn-it-all
```

### Database permissions

Ensure the database directory is writable:
```bash
chmod -R 755 database/
```

### Port already in use

Change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/docker-build-push.yml`) automatically:
1. Builds the Docker image on push to main
2. Runs on pull requests (build only, no push)
3. Pushes to GitHub Container Registry
4. Creates multi-architecture images
5. Generates build attestations
6. Caches layers for faster builds

### Manual Workflow Trigger

You can manually trigger the Docker build from GitHub:
1. Go to Actions tab
2. Select "Build and Push Docker Image"
3. Click "Run workflow"
