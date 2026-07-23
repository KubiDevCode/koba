export function inviteGenerateUrl(eventId: string) {
    const urlKey = import.meta.env.VITE_INVITE_URL_KEY

    const url = `${urlKey}${eventId}`

    return url
}