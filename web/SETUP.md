# Setup

## Before Getting Started

While we do our best & pin dependencies to mitigate these problems, modern js development means installing packages from [npm](https://www.npmjs.com/); and frankly Microsofts security standards as of late have been appalling. Supply chain attacks are becoming common enough that you should protect your machine before installing dependencies in any project, including ours

If you haven't already, we strongly urge y'all to harden your shell environment before going forward; it's not difficult, just follow [this](https://gist.github.com/Umbranoxio/84bb7f284ce8250108274f54dafef98b)

## Requirements

### Vite+

Install the Vite+ CLI, which provisions the Node and pnpm versions pinned by this project:

Linux and macOS:

```sh
curl -fsSL https://vite.plus | bash
```

Windows:

```sh
powershell -c "irm https://vite.plus/ps1 | iex"
```

If you already have the pnpm version pinned in `package.json`, Vite+ doesn't need to be installed globally:

```sh
pnpm install
pnpm exec vp dev
```

`pnpm install` installs the project-local Vite+ CLI. The global CLI is recommended because it also manages the pinned Node and pnpm versions

## Run ChroViewer

Install dependencies:

```sh
vp install
```

Start the development server:

```sh
vp dev
```

Vite prints the local URL when the server starts

## Environment

The default BeatSaver, ScoreSaber and BeatLeader endpoints work without an `.env` file. Copy `.env.example` to `.env` if you need to override them

`VITE_ENABLED_SOURCES` controls which remote sources are available. It defaults to all three:

```sh
VITE_ENABLED_SOURCES=beatsaver,scoresaber,beatleader
```

## Checks

Run formatting, linting and type-checking with:

```sh
vp check
```

Run the complete validation suite with:

```sh
vp run verify
```

This also checks generated API contracts and Protobuf files and creates a production build

## Production Build

Build and run the production server locally:

```sh
vp build
vp run start
```

`vp run start` serves on port `4000`

You can also build the production container:

```sh
docker build -t chroviewer .
docker run --rm -p 4000:4000 chroviewer
```
