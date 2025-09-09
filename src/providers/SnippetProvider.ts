// src/providers/SnippetProvider.ts
import * as vscode from 'vscode';

import { getShadcnComponents, ShadcnComponent } from '../api/shadcn';

export class SnippetProvider implements vscode.CompletionItemProvider {
    public async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
        const components = await getShadcnComponents();
        const completionItems: vscode.CompletionItem[] = [];

        for (const component of components) {
            const item = new vscode.CompletionItem(
                `shadcn: ${component.label}`, // O que aparece na lista de sugestões
                vscode.CompletionItemKind.Snippet
            );

            // O texto que será inserido, como um SnippetString
            item.insertText = new vscode.SnippetString(component.snippet);

            item.documentation = `Insere o snippet do componente ${component.label} e adiciona o import automaticamente.`;

            // Comando que será executado DEPOIS que o usuário selecionar o snippet
            item.command = {
                command: 'shadcn-helper.insertSnippetWithImport',
                title: 'Insert Shadcn Snippet',
                arguments: [component] // Passamos o objeto completo do componente para o comando
            };

            completionItems.push(item);
        }

        return completionItems;
    }
}
