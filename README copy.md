# ssipr_admin

> SSIPR Admin web app powered by Nuxt.js

-------------------------------------------------
### Dependencies
|Library :|Version|
|--------|:------|
|node|10.15.3|
|npm|6.4.1|
|yarn|1.15.2|
|nuxt|2.6.3|

-------------------------------------------------

## Run || Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
# ensure .env contains API_URL to API endpoint

### first time only ###
$ npm install pm2 -g 
# be sure that you have the public ssh key on your local machine
$ ssh-copy-id node@myserver.com
# troubleshooting key, sometimes just need to run add key
ssh-add /path/to/key
### first time only ###

$ pm2 deploy ecosystem.config.js staging 
$ pm2 deploy ecosystem.config.js production 
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

-------------------------------------------------
### How to Contribute
|Branch Prefix :|Desc|
|--------|:------|
|f|Feature. For new feature|
|c|Chore. For enhancement|
|fix|For fixing codes|

``` bash
# Create new branch to start your task
$ git checkout -b f/users

# Commit, then push changes to repository
$ git push origin f/users
```

Once changes pushed, make a PR so that admin can verify before he merge to `master` branch.

-------------------------------------------------
### Working with ESLint in VS Code

Plugins & snippets required:

1. ESlint
2. Vetur
3. Vue VS Code Snippets
4. Go to `File` > `Preferences` > `Settings` and search for `ESLint`. Then clicks `Edit in settings.json`. Copy below codes then paste in that file.

```
"eslint.autoFixOnSave": true,
"eslint.validate": [
    {
        "language": "vue",
        "autoFix": true
    },
    {
        "language": "html",
        "autoFix": true
    },
    {
        "language": "javascript",
        "autoFix": true
    }
]

```

By doing so, each errors informed by ESLint will be fixed automatically during code saving.

