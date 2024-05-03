# mmp

Mesoamerican Migration Project

## 🚀 Project Structure

```text
├── public/
     ├── admin/
         ├──config.yml
         
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

## Getting Started with Development

### Install Dependencies

Install the `node`-dependencies and the workspaces:

```zsh
npm install
```

### Develop Site in Workspace

Run the example site in develop mode:

```zsh
npm run start
```

If you want to run the Static CMS backend, then you need to start the server in a
separate terminal window.

```shell
npx @staticcms/proxy-server
```

In the `public/admin/config.yml` file, change the `local_backend` parameter to:

```yml
local_backend: true
```

Then load the `https://localhost:4321/admin/index.html` to view the Static CMS UI.

### Use Prettier Code Formatter in WebStorm

To set up the prettier code formatter, first install the dependencies (`npm install`) and then ensure that `prettier`
is activated in the dialog box: WebStorm > Preferences > Languages and Frameworks > JavaScript > Prettier.

The settings should be:

- Prettier package: `yarn:package.json:prettier` (only selectable if you have previously run `yarn install`)
- Run for files: the default suggested by WebStorm
- [x] On 'Reformat Code' action
- [x] On save
