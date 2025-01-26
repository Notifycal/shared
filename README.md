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

### From CI (Github Actions)

1. Go to the [package settings page](https://github.com/orgs/Notifycal/packages/npm/shared/settings) and ensure the repo you want to install this package from is in the list with `Read` access.
2. In your workflow file, give the job the `packages: read` permission.
3. Tweak your workflow file to generate a `.npmrc` that uses the default `GITHUB_TOKEN` before `actions/setup-node`.

Example: Github workflow changes:

```yaml
permissions:
  packages: read
  # any other permissions required

steps:
  # [...]
  - name: Generate .npmrc
    run: |
      echo "//npm.pkg.github.com/:_authToken=${{secrets.GITHUB_TOKEN}}" > .npmrc
      echo "@notifycal=https://npm.pkg.github.com/" >> .npmrc
  - uses: actions/setup-node@v4
    with:
      node-version-file: '.nvmrc'
      cache: 'npm'
  # [...]
  - run: npm install # or npm ci
```
