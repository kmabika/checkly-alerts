# Checly Alerts

## Installation
1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. You can check if they are installed by running the following commands in your terminal:
```sh
node -v
npm -v
```

2. Clone or download the repository to your local machine.

3. Navigate to the project directory and run the following command to install the necessary dependencies:
```sh
npm install
```


## Starting the App
1. Create a new app and bot on the [Slack API website](https://api.slack.com/apps) and obtain a `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN`.

2. In the project directory, create a file called `.env` and set the following environment variables:
```bash
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
```

3. To start the app, run the following command:
```sh
npm run local
```
