import { config as loadEnv } from 'dotenv';

loadEnv({ override: true });

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
