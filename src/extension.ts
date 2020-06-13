// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('linegapper.gapline', () => {
		// declara la variable editor y le asigna el editor de texto actual de vs code
		const editor = vscode.window.activeTextEditor;

		// si no hay editor activo sale de la función;
		if (!editor) { return; }

		// declara la variable selection y le asigna el objeto selection
		var selection = editor.selection;
		// declara la variable texto y asigna el texto seleccionado
		var text = editor.document.getText(selection);

		// Imprime en la caja del Command palette la pregunta por cada cuántas líneas se creará un nuevo salto
		vscode.window.showInputBox({ prompt: '¿Líneas?' }).then(value => {
			// declara la variable numberOfLines y le asinga el número ingresado por el usuario
			let numberOfLines = + Number(value);

			// declara un array de String 
			var textInChunks: Array<string> = [];

			// Hace un split de las líneas del texto seleccionado y lo agrega al array
			text.split('\n').forEach((currentLine: string, lineIndex) => {
				textInChunks.push(currentLine);

				// agrega un espacio en el array cada N líneas que representa la cantidad en la que se quiere dividir la selección
				if ((lineIndex + 1) % numberOfLines === 0) { textInChunks.push(''); }
			});

			// Agrega un salto de línea a cada elemento del array
			text = textInChunks.join('\n');

			// Sustituye el texto seleccionado por el usuario con el nuevo texto con los saltos de línea cada N líneas

			editor.edit((editBuilder) => {
				var range = new vscode.Range(selection.start.line, 0, selection.end.line, Number(editor.document.lineAt(selection.end.line).text.length));
				editBuilder.replace(range, text);
			});
		});
	});
	context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() { }
