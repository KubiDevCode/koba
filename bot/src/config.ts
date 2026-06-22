import { config as loadEnv } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

loadEnv({ path: resolve(currentDir, '../../.env'), override: true });
loadEnv({ override: false });

function requireEnv(name: string) {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`${name} is not defined`);
    }

    return value;
}

export const appConfig = {
    botToken: requireEnv('BOT_TOKEN'),
    databaseUrl: requireEnv('DATABASE_URL'),
    openAiApiKey: requireEnv('OPENAI_API_KEY'),
    deepseekBaseUrl:
        process.env.DEEPSEEK_BASE_URL?.trim() ?? 'https://api.deepseek.com',
    miniAppUrl: requireEnv('MINI_APP_URL'),
};
