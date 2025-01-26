# @notifycal/shared

NPM library containing common code, shared across multiple components.

## Core areas

### `types/`

### `utils/`

### Adding a new export

Check how it's done in the `"exports"` key of [`package.json`](./package.json).

## How to install

### From Github registry

1. Create a Personal Access Token (classic)

Go to your Github profile > Settings. Then open Developer Settings in the sidebar, and Personal access tokens > Tokens (classic). Or click [here](https://github.com/settings/tokens).

Create a new token (classic) with at least `read:packages` scope and no expiration.

Copy the provided token, we'll use it in the next step.

2. Create a `.npmrc` in your user folder

```
$ cat ~/.npmrc
@notifycal:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<PAT_TOKEN>
```

3. Install!

```
$ npm install @notifycal/shared

up to date, audited 752 packages in 1s

244 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Using `npm link` for development

1. First run `npm link` from this package folder.
2. Then run `npm link @notifycal/shared` from the package that wants to install it.
