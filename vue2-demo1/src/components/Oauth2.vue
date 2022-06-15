<script>
// const test_url = 'hi test'
export default {
    // test_url
    name: 'Oauth2',
    data() {
        return {
            // oauth2: {
                authorizationGrantType: {
                    // 授权码模式
                    authorizationCode: {
                        // authorize端点
                        authorizeEndpoint: {
                            url: 'http://auth-server:9000/oauth2/authorize?',
                            config: {
                                client_id: "rico-client",
                                client_secret: "123",
                                response_type: "code",
                                scope: "openid test.read",
                                redirect_uri: window.location.protocol + '//' + window.location.host + this.$router.resolve({name: 'SpringOauth2CodeCallback'}).href,
                            },
                            code: ''
                        },
                        // token端点
                        tokenEndpoint: {
                            url: '/springauthhost/oauth2/token',
                            config: {
                                client_id: 'rico-client',
                                grant_type: 'authorization_code',
                                redirect_uri: window.location.protocol + '//' + window.location.host + this.$router.resolve({name: 'SpringOauth2CodeCallback'}).href,
                                code: ''
                            },
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": "Basic " + Buffer.from('rico-client:123').toString('base64')
                            },
                            access_token: ''
                        }
                    },
                    // 密码模式将废弃
                    password: {
                        // ...
                    }
                }
            // },
        };
    },
}
</script>