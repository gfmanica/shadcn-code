// src/commands/index.ts
import * as vscode from 'vscode';
import { TreeItem } from '../providers/TreeItem';
import { ShadcnComponent } from '../api/shadcn'; // <-- IMPORTAR O NOVO TIPO

// ... (função getWorkspaceFolder e a função registerCommands)

export function registerCommands(context: vscode.ExtensionContext, provider: { refresh: () => void; }) {
    // ... (comandos installShadcn, installRegistry, refresh)

    // NOVO COMANDO PARA O SNIPPET
    const insertSnippet = vscode.commands.registerCommand('shadcn-helper.insertSnippetWithImport', async (component: ShadcnComponent) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const document = editor.document;
        const fileContent = document.getText();

        // 1. Verifica se o import já existe para não duplicar
        if (!fileContent.includes(component.import)) {
            const edit = new vscode.WorkspaceEdit();
            const importStatement = component.import + '\n';
            // Insere o import na primeira linha do arquivo
            edit.insert(document.uri, new vscode.Position(0, 0), importStatement);
            await vscode.workspace.applyEdit(edit);
        }

        // 2. Insere o snippet na posição atual do cursor.
        // O VS Code já faz isso por padrão quando um CompletionItem é selecionado,
        // então não precisamos reinseri-lo. Este comando foca apenas no import.
        // Se quiséssemos mais controle, poderíamos inserir o snippet aqui com `editor.insertSnippet(...)`
    });

    // Adiciona o novo comando à lista de subscriptions
    context.subscriptions.push(installShadcn, installRegistry, refresh, insertSnippet);
}