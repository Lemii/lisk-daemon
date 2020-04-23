# Lisk Daemon

A background service that provides information about the Lisk Node that it is running on and (optionally) enables the remote execution of Lisk Core commands (opt-in).

Primarily created to be used in conjuction with [Lisk Manager](https://github.com/lemii/lisk-manager), but can be used as a stand-alone service as well.

## Index

- [Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Starting the daemon](#starting-the-daemon)
  - [Using NPM](#using-npm)
  - [As PM2 process](#as-a-pm2-process)
- [API endpoints](#api-endpoints)
  - [/system](#system)
  - [/settings](#settings)
  - [/node/:command](#nodecommand)
- [NPM scripts](#npm-scripts)
- [License](#license)

---

## Setup

### Requirements

- Ubuntu 16.04 / 18.04
- Node.js 12.15.0 or higher
- PM2 (recommended)

### Installation

```
git clone https://github.com/lemii/lisk-daemon.git
cd lisk-daemon
npm install
```

## Configuration

```
nano src/config.ts
```

| type         | parameter            | value                                                            |
| ------------ | -------------------- | ---------------------------------------------------------------- |
| api          | port                 | port that the server will run on                                 |
|              | whitelist            | array of IP addresses that can access the API                    |
|              | maxRequestsPerSecond | amount of API requests per second that the service is limited to |
| logging      | format               | verbosity of access log                                          |
|              | outputToConsole      | enable / disable logging to console                              |
|              | outputToFile         | enable / disable logging to file                                 |
|              | logFile              | file to write access logs to                                     |
| nodeCommands | allow                | enable / disable remote execution of node commands               |
|              | key                  | the key that has to be supplied with each POST request           |

## Starting the daemon

### Using NPM

```
npm start
```

## As a PM2 process

```
pm2 start --name lisk-daemon npm -- start
```

For more commands, view the [NPM scripts](#npm-scripts) at the bottom of this page.

## API Endpoints

#### /system

Returns system info:

```json
{
  "status": 200,
  "message": "System info retrieved successfully",
  "data": {
    "hostname": "lisk-testnet",
    "loadAverage": [0.08984375, 0.07177734375, 0.08447265625],
    "uptime": 193974,
    "memory": {
      "total": 4035444736,
      "free": 156024832
    },
    "disk": {
      "total": 40263905280,
      "free": 19961303040
    },
    "cpus": [
      {
        "model": "Intel Xeon Processor (Skylake, IBRS)",
        "speed": 2099,
        "times": {
          "user": 228046300,
          "nice": 51600,
          "sys": 24338000,
          "idle": 1655459600,
          "irq": 0
        }
      },
      {
        "model": "Intel Xeon Processor (Skylake, IBRS)",
        "speed": 2099,
        "times": {
          "user": 187988700,
          "nice": 91400,
          "sys": 22695600,
          "idle": 1708403800,
          "irq": 0
        }
      }
    ],
    "type": "Linux",
    "release": "4.15.0-96-generic"
  }
}
```

#### /settings

Returns the configuration of the daemon:

```json
{
  "status": 200,
  "message": "Daemon settings retrieved successfully",
  "data": {
    "systemInfo": true,
    "bash": true,
    "keyRequired": true
  }
}
```

#### /node/:command

> Disclaimer: Enabling remote execution of Lisk Core commands is a potential security vulnerability. Please use at your own risk. This feature is blocked by default and must be manually enabled in `config.ts`.

Executes a Lisk Core command. Available options: `start`, `stop`, `reload`, `status`, `logs`.

Eg: `/node/start`

```json
{
  "status": 200,
  "message": "Bash command executed successfully",
  "data": "Lisk configured for testnet\n[+] Postgresql is running.\n[+] Lisk started successfully.\n[+] Lisk is running as PID: 20605\nCurrent Block Height:  10636513\n"
}
```

`/node/logs` initiates a download of the Lisk Core log file.

## NPM scripts

#### `npm run start:dev`

Starts the application in development mode using `nodemon` and `ts-node` to do hot reloading.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run test`

Starts the test suite using `jest` and generates a coverage report.

#### `npm run test:watch`

Starts the test suite using `jest` and watch for any file changes.

## License

Licensed under [MIT](LICENSE).
