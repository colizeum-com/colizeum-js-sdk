import Colizeum from './src'

console.log('Doin stuff')

const colizeum = new Colizeum({
    appId: '111-222-333',
    clientId: 'EvArLTfXFs6hum7Z',
    redirectUri: 'http://127.0.0.1:50100',
})

const verifier = colizeum.auth.generateVerifier()

console.log(
    colizeum.auth.getAuthenticationUrl({
        pkce: true,
        challenge: colizeum.auth.generateChallenge(verifier),
    })
)
