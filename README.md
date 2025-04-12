# DIVA Score Backend API

This is the CMS for DIVA Score, the app.

## Setup

This repo is using a shared types repo from [elilemons/diva-score-lib](https://github.com/elilemons/diva-score-lib). In order for that to work you will need to adjust your local machines `~/.ssh/config` file

1. `cd ~/.ssh`
2. `nano config`
3. adjust your github Host to be

```
Host github.com*
  HostName github.com
  IdentityFile ~/.ssh/FILENAME_OF_YOUR_LOCAL_SSH
```

Note: To find the `FILENAME_OF_YOUR_lOCAL_SSH`, run `ls` in after running `cd ~/.ssh` and use the same key that you use to authenticate with your github account

<br/>

## Getting Started

- Clone the repo
- Create and fill out an `.env` file with the contents from the `.env.example` file
- Run Yarn (if this fails on the `@elilemons/diva-score-lib` install, look above)
- `yarn dev` will boot the payload express server up

### Deployments

This Payload app is hosted on PayloadCMS. It auto deploys on merge to the `main` branch.
