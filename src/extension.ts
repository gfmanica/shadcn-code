// src/extension.ts
import * as vscode from 'vscode';

import { registerCommands } from './commands';
import { ShadcnProvider } from './providers/ShadcnProvider';
import { SnippetProvider } from './providers/SnippetProvider'; // <-- IMPORTAR O SNIPPET PROVIDER

export function activate(context: vscode.ExtensionContext) {
    // Cria o Provedor da Tree View
    const shadcnProvider = new ShadcnProvider();
    vscode.window.createTreeView('shadcn-ui-helper', {
        treeDataProvider: shadcnProvider
    });

    // Registra todos os comandos da extensão
    registerCommands(context, shadcnProvider);

    // ATIVAÇÃO DO SNIPPET PROVIDER
    const snippetProvider = new SnippetProvider();
    // Registra o provider para arquivos React (TSX e JSX)
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            ['typescriptreact', 'javascriptreact'],
            snippetProvider,
            ':' // Opcional: pode acionar ao digitar, por exemplo, ':'
        )
    );
}

export function deactivate() {}
