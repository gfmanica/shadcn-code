import * as vscode from 'vscode';

import { RegistryComponent } from '../types';

export type ItemType = 'category' | 'shadcn' | 'registry';

export class TreeItem extends vscode.TreeItem {
    public itemType: ItemType;
    public componentData?: RegistryComponent;
    public installName?: string; // <-- NOVA PROPRIEDADE PARA ARMAZENAR O NOME DE INSTALAÇÃO

    constructor(
        public readonly label: string,
        itemType: ItemType,
        collapsibleState: vscode.TreeItemCollapsibleState,
        data?: any // Usamos 'any' para aceitar tanto RegistryComponent quanto string (installName)
    ) {
        super(label, collapsibleState);
        this.itemType = itemType;
        this.contextValue = itemType;

        if (itemType === 'shadcn') {
            this.installName = data; // Armazena o installName
            this.command = {
                command: 'shadcn-helper.installShadcnComponent',
                title: 'Instalar Componente Shadcn',
                arguments: [this] // Passa o item inteiro para o comando
            };
        } else if (itemType === 'registry') {
            this.componentData = data;
            this.command = {
                command: 'shadcn-helper.installRegistryComponent',
                title: 'Instalar Componente do Registry',
                arguments: [this]
            };
        }
    }
}
