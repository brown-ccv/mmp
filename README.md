# mmp

Mesoamerican Migration Project

## 🚀 Project Structure

```text
├── public/
     ├── admin/
         ├──config.yml
         ├── previews/
         
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

## StaticCMS

Link to docs: https://www.staticcms.org/docs/

### Collections

The collections for the CMS are defined in the public/admin/config.yml file. Here is where you can add/remove/edit any
specific fields within a collection, specify output paths for collections, and configure i18n.

If you edit any fields, make sure they match in astro's content configuration, located in the src/content/config.ts
file. We use zod to type the markdown file frontmatter.

### Previews

StaticCMS enables custom previews by exposing a few constructs globally to allow us to create components inline. While
the docs show examples for tsx and jsx, only js files with the h function seem to work at this time.

When editing styling for the People page or the News page, be sure to edit the corresponding preview pages to match.

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
