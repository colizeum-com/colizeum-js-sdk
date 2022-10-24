export function generateRandomString(length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export function base64URL(value: string) {
    return base64Encode(value).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function base64Encode(value: string) {
    if (typeof window !== 'undefined' && window.btoa) {
        return window.btoa(value)
    }

    return Buffer.from(value).toString('base64')
}

export function base64Decode(value: string) {
    if (typeof window !== 'undefined' && window.atob) {
        return window.atob(value)
    }

    return new Buffer(value).toString()
}
