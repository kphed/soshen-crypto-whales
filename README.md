# Crypto  🐳 Feed
> Real-time tweets for "whale-sized" cryptocurrency transactions using the sōshen and Twitter APIs.

- Live demo: https://twitter.com/soshenwhales
- Vote on the future of Crypto  🐳 Feed by following us here: https://twitter.com/soshenio
- Built using the blockchain API at https://soshen.io

## Install Node v10.15.3 (via [nvm](https://github.com/nvm-sh/nvm))

1) Assuming you already have Git, install [nvm]() using one of the two options (directly from their GitHub README [here](https://github.com/nvm-sh/nvm#installation-and-update)):

cURL:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

Wget:
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

2) Check if nvm was properly installed:

```
command -v nvm
```

Which should output `nvm`. If you're getting a `command not found`, and closing + reopening your terminal doesn't work, follow these steps [here](https://github.com/nvm-sh/nvm#installation-and-update) to troubleshoot.

3) Download and install Node v10.15.3:

```
nvm install 10.15.3
```

4) Close and reopen your terminal, then check if the proper node version was installed:

```
nvm run node --version
```

Which should output something like...
```
Running node v10.15.3 (npm v6.9.0)
v10.15.3
```

## Run the app

1) Run `npm install` to install the app dependencies
2) Rename the .env.example file to .env, and set the environment variable values using your [sōshen](https://soshen.io) project's credentials and your Twitter developer account's API credentials
3) Run `npm start`

🚀
