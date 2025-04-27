# Bitburner Integration Server

A Deno-based server that enables real-time file synchronization between filesystem and the
[Bitburner](https://danielyxie.github.io/bitburner/) game.

## Overview

This server watches your local scripts in the `src/client` directory and automatically uploads them to the game when
changes are detected. This allows you to write and edit your Bitburner scripts in VSCode with full IDE support, instead
of using the in-game editor.

## Features

- Real-time file synchronization
- WebSocket-based communication with Bitburner

## Prerequisites

- [Deno](https://deno.land/) runtime installed
- [Bitburner](https://danielyxie.github.io/bitburner/) game running and connected to the server
- [Docker](https://www.docker.com/) for containerized deployment (optional)

## Installation

1. Clone this repository
2. Make sure Deno is installed on your system
3. Enable the Remote API in Bitburner's options menu

## Local Development

For local development, you can run the server directly using Deno:

```bash
deno task server
```

This is the simplest way to get started and is recommended for development. The server will:

- Watch for file changes in the `src/client` directory
- Automatically sync changes with Bitburner
- Provide real-time feedback in the terminal

## Usage

1. Start the server:
   ```bash
   deno task server
   ```

2. Connect to the server in Bitburner:
   - Open the game
   - Navigate to Options > Remote API
   - Set port to 8080
   - Click "Connect"

3. Place your scripts in the `src/client` directory
4. Any changes to files will automatically sync with the game

## Configuration

### Server Configuration

The server runs with the following default settings:

- Host: `127.0.0.1`
- Port: `8080`
- Environment: `production`

You can modify these settings in either:

- `src/server/server.config.ts` file
- `.env` file with the following variables:

```bash
SERVER_PORT=8080
SERVER_HOST=127.0.0.1
DENO_ENV=production
```

## Docker Support

The project includes Docker and Docker Compose support for easy deployment and development.

### Using Docker Compose

1. Build and start the container:

```bash
docker-compose up -d
```

2. To stop the container:

```bash
docker-compose down
```

### Using Docker Directly

1. Build the image:

```bash
docker build -t bitburner-server .
```

2. Run the container:

```bash
docker run -d -p 8080:8080 --env-file .env bitburner-server
```

The container exposes port 8080 and uses the environment variables from your `.env` file. Make sure to have your `.env`
file properly configured before running the container.

###### Notes

🔮🪄 Its enterprise grade™ for the fun of it. 🪄🔮
