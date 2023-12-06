// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "create-index" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('create-index.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello from CreateIndex!');
    createIndexFile();
  });

  context.subscriptions.push(disposable);
}

const createIndexFile = () => {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    infoLogger('Run command in a file that is inside the same folder you want to create index file');
    return;
  }

  const currentFilePath = activeEditor.document.uri.fsPath;
  const currentPath = path.dirname(currentFilePath);

  const filesInFolder = fs.readdirSync(currentPath);

  const supportedFileExt = ['.js', '.ts', '.jsx', '.tsx'];

  // check for files with .js/ts or .jsx/tsx file extension

  const filesWithSupportedExt: string[] = [];

  for (const file of filesInFolder) {
    const fileExt = path.extname(file);
    if (fileExt && supportedFileExt.includes(fileExt)) {
      filesWithSupportedExt.push(file);
    }
  }

  // if no files with supported file extensions is found, show a notification and stop.
  if (filesWithSupportedExt.length === 0) {
    infoLogger('No files with .js|.ts|.jsx|.tsx extensions found in current folder.');
    return;
  }

  // create index file: with file names and export * from file names

  const fileContent: string[] = [];

  for (const file of filesWithSupportedExt) {
    const fileName = path.basename(file);
    fileContent.push(`export * from './${fileName}';`);
  }

  const indexFilePath = path.join(currentPath, 'index.ts');
  // create index file
  createNewFile(indexFilePath, fileContent);

  // show success notification
  infoLogger(`index file created in /${path.basename(currentPath)}`);

  // -end
};

const createNewFile = (filePath: string, content: string[]) => {
  // check if file exists
  if (fs.existsSync(filePath)) {
    infoLogger('Index file already exists.');
    return;
  }

  // create new file with content
  fs.writeFileSync(filePath, content.join('\n'));
  return;
};

// info logger
const infoLogger = (message: string) => {
  vscode.window.showInformationMessage(message);
};

// This method is called when your extension is deactivated
// export function deactivate() {}
