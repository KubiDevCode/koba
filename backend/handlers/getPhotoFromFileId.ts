type TelegramGetFileResponse = {
    ok: boolean;
    result?: {
        file_path?: string;
    };
    description?: string;
};


export async function downloadTelegramPhoto(fileIdOrUrl: string) {

    const botToken = process.env.BOT_TOKEN;

    if (!botToken) {
        throw new Error("BOT_TOKEN is not defined");
    }

    const fileResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileIdOrUrl)}`
    );

    const fileData = await fileResponse.json() as TelegramGetFileResponse;

    if (!fileResponse.ok || !fileData.ok || !fileData.result?.file_path) {
        throw new Error(fileData.description ?? "Telegram getFile failed");
    }

    const imageResponse = await fetch(
        `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`
    );

    if (!imageResponse.ok) {
        throw new Error(`Telegram file download failed: ${imageResponse.status}`);
    }

    const mimeType = imageResponse.headers.get("content-type");

    return {
        buffer: Buffer.from(await imageResponse.arrayBuffer()),
        mimeType: mimeType && mimeType !== "application/octet-stream" ? mimeType : "image/jpeg",
    };
}
