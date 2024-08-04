# Create Index File VS Code

Create index export file for .js/ts or .jsx/tsx files in the current folder

```
example:
        |
        |- elements
            |- Button.tsx
            |- Modal.tsx
            |- Modal.tsx

 If you execute Create Index File command in any of the files
 inside elements folder it will create index.ts

result: new file (index.ts) inside elements folder

    index.ts

    export { default } from ./Button
    export { default } from ./Modal
    export { default } from ./Modal


```

## Installation

Add extension to VS code

```bash
    2. Search for Create Index File
    3. Check for extension with manish as author name
    4. Click Install
```

VS code marketplace link: https://marketplace.visualstudio.com/items?itemName=manishMandal.generate-index-file

## Run Locally

Clone the project

```bash
  git clone https://github.com/manishMandal02/create-index-vscode-extension
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the dev server

```bash
  yarn run watch
```

Debug extension (opens new window with extension insalled)

```bash
  press F5
```

## Authors

- [@manishMandal02](https://github.com/manishMandal02)
