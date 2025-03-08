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
- File management (create, update, delete, list)
- RAM calculation for scripts
- TypeScript support

## Prerequisites

- [Deno](https://deno.land/) runtime installed
- [Bitburner](https://danielyxie.github.io/bitburner/) game running and connected to the server

## Installation

1. Clone this repository
2. Make sure Deno is installed on your system
3. Enable the Remote API in Bitburner's options menu

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

The server runs on `localhost:8080` by default.

You can modify the server configuration in `src/server/server.config.ts` or .env file.

```bash
SERVER_PORT=8080
SERVER_HOST=127.0.0.1
```
