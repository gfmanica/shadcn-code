// src/api/shadcn.ts

import axios from 'axios';
import * as vscode from 'vscode';

import { RegistryComponent } from '../types';

export interface ShadcnComponent {
    label: string; // Ex: "Alert Dialog"
    installName: string; // Ex: "alert-dialog"
    import: string; // Ex: "import { Button } from '@/components/ui/button';"
    snippet: string; // Ex: "<Button>$0</Button>"
}

/**
 * Retorna a lista de componentes oficiais do Shadcn UI com dados para snippets.
 */
export function getShadcnComponents(): Promise<ShadcnComponent[]> {
    const componentLabels = [
        'Accordion',
        'Alert',
        'Alert Dialog',
        'Aspect Ratio',
        'Avatar',
        'Badge',
        'Breadcrumb',
        'Button',
        'Calendar',
        'Card',
        'Carousel',
        'Chart',
        'Checkbox',
        'Collapsible',
        'Combobox',
        'Command',
        'Context Menu',
        'Data Table',
        'Date Picker',
        'Dialog',
        'Drawer',
        'Dropdown Menu',
        'Hover Card',
        'Input',
        'Input OTP',
        'Label',
        'Menubar',
        'Navigation Menu',
        'Pagination',
        'Popover',
        'Progress',
        'Radio Group',
        'React Hook Form',
        'Resizable',
        'Scroll-area',
        'Select',
        'Separator',
        'Sheet',
        'Sidebar',
        'Skeleton',
        'Slider',
        'Sonner',
        'Switch',
        'Table',
        'Tabs',
        'Textarea',
        'Toast',
        'Toggle',
        'Toggle Group',
        'Tooltip',
        'Typography'
    ];

    const componentsPath = vscode.workspace
        .getConfiguration('shadcn-helper')
        .get<string>('componentsPath', '@/components/ui');

    const components = componentLabels.map((label) => {
        const installName = label.toLowerCase().replace(/ /g, '-');
        const componentName = label.replace(/ /g, ''); // Ex: "AlertDialog"

        // Constrói o import e o snippet dinamicamente
        return {
            label: label,
            installName: installName,
            import: `import { ${componentName} } from '${componentsPath}/${installName}';`,
            snippet: `<${componentName}>$0</${componentName}>`
        };
    });

    return Promise.resolve(components);
}

// A função getRegistryComponents não muda
export async function getRegistryComponents(): Promise<RegistryComponent[]> {
    // ... código sem alterações
    const registryUrl = vscode.workspace
        .getConfiguration('shadcn-helper')
        .get<string>('registryUrl');
    if (!registryUrl) {
        return [];
    }
    try {
        const response = await axios.get(registryUrl);
        return response.data as RegistryComponent[];
    } catch (error) {
        vscode.window.showErrorMessage(
            `Falha ao buscar componentes do Registry: ${registryUrl}`
        );
        console.error(error);
        return [];
    }
}
