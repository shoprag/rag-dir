import * as fs from 'fs';
import * as path from 'path';
import { RAG } from '@shoprag/core'

export default class DirRAG implements RAG {
    private outputDir: string;

    requiredCredentials(): { [credentialName: string]: string } {
        return {};
    }

    async init(credentials: { [key: string]: string }, config: { [key: string]: string }): Promise<void> {
        if (!config['outputDir']) {
            throw new Error('outputDir must be specified in the config');
        }
        this.outputDir = path.resolve(process.cwd(), config['outputDir']);
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    private getSafeFilePath(fileId: string): string {
        const safeFileId = fileId.replace(/[\/\\]/g, '_');
        return path.join(this.outputDir, `${safeFileId}.txt`);
    }

    async addFile(fileId: string, content: string): Promise<void> {
        const filePath = this.getSafeFilePath(fileId);
        try {
            await fs.promises.writeFile(filePath, content, 'utf-8');
        } catch (err) {
            throw new Error(`Failed to add file ${fileId}: ${err.message}`);
        }
    }

    async updateFile(fileId: string, content: string): Promise<void> {
        await this.addFile(fileId, content);
    }

    async deleteFile(fileId: string): Promise<void> {
        const filePath = this.getSafeFilePath(fileId);
        if (fs.existsSync(filePath)) {
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                throw new Error(`Failed to delete file ${fileId}: ${err.message}`);
            }
        }
    }

    async finalize(): Promise<void> {
        // No-op for this RAG
    }

    async deleteAllFiles(): Promise<void> {
        try {
            const files = await fs.promises.readdir(this.outputDir);
            for (const file of files) {
                if (file.endsWith('.txt')) {
                    await fs.promises.unlink(path.join(this.outputDir, file));
                }
            }
        } catch (err) {
            throw new Error(`Failed to delete all files: ${err.message}`);
        }
    }
}