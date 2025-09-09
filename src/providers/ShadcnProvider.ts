import * as vscode from 'vscode';

import { getRegistryComponents, getShadcnComponents } from '../api/shadcn';
import { TreeItem } from './TreeItem';

export class ShadcnProvider implements vscode.TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<
        TreeItem | undefined | void
    > = new vscode.EventEmitter<TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | void> =
        this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: TreeItem): Promise<TreeItem[]> {
        if (element) {
            if (element.label === 'Componentes Shadcn UI') {
                const components = await getShadcnComponents();
                // MUDANÇA AQUI: Usamos comp.label para o nome e passamos comp.installName como dado
                return components.map(
                    (comp) =>
                        new TreeItem(
                            comp.label,
                            'shadcn',
                            vscode.TreeItemCollapsibleState.None,
                            comp.installName
                        )
                );
            }
            if (element.label === 'Registry Personalizado') {
                const components = await getRegistryComponents();
                // MUDANÇA AQUI: Passamos o objeto 'comp' inteiro como dado
                return components.map(
                    (comp) =>
                        new TreeItem(
                            comp.name,
                            'registry',
                            vscode.TreeItemCollapsibleState.None,
                            comp
                        )
                );
            }
            return [];
        } else {
            return [
                new TreeItem(
                    'Componentes Shadcn UI',
                    'category',
                    vscode.TreeItemCollapsibleState.Collapsed
                ),
                new TreeItem(
                    'Registry Personalizado',
                    'category',
                    vscode.TreeItemCollapsibleState.Collapsed
                )
            ];
        }
    }
}
