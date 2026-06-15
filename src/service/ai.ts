import OpenAI from 'openai';
import { appConfig } from '../config.js';
import { systemPrompt } from '../consts.js';

const deepseek = new OpenAI({
    apiKey: appConfig.openAiApiKey,
    baseURL: appConfig.deepseekBaseUrl,
});

type AiReplyInput = {
    context: string;
    username: string;
    text: string;
};

export async function getAiReply(input: AiReplyInput) {
    const userPrompt = `
Recent chat messages:
${input.context}

Latest message:
${input.username}: ${input.text}
Reply like a Telegram chat participant.
`;

    const response = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            {
                role: 'user',
                content: userPrompt,
            },
        ],
        temperature: 1.3,
        max_tokens: 150,
    });

    return response.choices[0]?.message?.content ?? 'No response from model.';
}
