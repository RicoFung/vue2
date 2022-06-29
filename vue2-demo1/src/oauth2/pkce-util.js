import crypto from 'crypto';

function base64URLEncode(str) {
    let base64 = Buffer.from(str).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
    return base64
}

function sha256(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest();
}

function genCodeVerifier() {
        let random = crypto.randomBytes(32)
        let codeVerifier = this.base64URLEncode(random)
        console.log("gen code_verifier => " + codeVerifier)
        localStorage.removeItem('codeVerifier')
        localStorage.setItem('codeVerifier', codeVerifier)
        return codeVerifier
}

function genCodeChallenge(codeVerifier) {
        let sha256 = this.sha256(codeVerifier)
        let codeChallenge = this.base64URLEncode(sha256)
        console.log("gen code_challenge => " + codeChallenge)
        localStorage.removeItem('codeChallenge')
        localStorage.setItem('codeChallenge', codeChallenge)
        return codeChallenge
}

export default {
    name: 'pkce-util',

    base64URLEncode,
    sha256,
    genCodeVerifier,
    genCodeChallenge
}