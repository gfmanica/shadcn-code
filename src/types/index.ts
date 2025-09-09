// src/types/index.ts
export interface RegistryComponent {
    name: string;
    dependencies: string[];
    files: Array<{
        name: string;
        content: string;
    }>;
}
