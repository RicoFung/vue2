const client_id = 'rico-client'
const client_secret = '123'
const response_type = 'code'
const scope = 'openid test.read'
const grant_type = 'authorization_code'
const redirect_uri = window.location.protocol + '//' + window.location.host + '/oauth2/callback'

export default {
    name: 'Oauth2',
    authorizationGrantType: {
        // 授权码模式
        authorizationCode: {
            // authorize端点
            authorizeEndpoint: {
                // 此处必须显式写授权服务器域名，不可用vue.config.js中配置的proxy（使用：window.open/location.href）
                url: 'http://auth-server:9000/oauth2/authorize?',
                config: {
                    client_id: client_id,
                    client_secret: client_secret,
                    response_type: response_type,
                    scope: scope,
                    redirect_uri: redirect_uri,
                },
                code: '' // 授权码，认证成功后回写
            },
            // token端点
            tokenEndpoint: {
                url: '/springauthhost/oauth2/token',
                config: {
                    grant_type: grant_type,
                    redirect_uri: redirect_uri,
                    code: '' // 授权码，取值来自authorizeEndpoint.code
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + Buffer.from(client_id + ':' + client_secret).toString('base64')
                },
                access_token: '' // 访问令牌(jwt)，授权成功后回写
            }
        },
        // 密码模式将废弃
        password: {
            // ...
        }
    }
}