import axios from "axios"
import dialogUtil from "../utils/dialog-util";
import pkceUtil from './pkce-util.js'

// require querystring
const querystring = require("querystring");
// client config
const client_id = 'rico-client-pkce'
const client_secret = '123'
const code_challenge_method = 'S256'
const response_type = 'code'
const scope = 'openid test.read'
const grant_type = 'authorization_code'
const redirect_uri = window.location.protocol + '//' + window.location.host + '/oauth2/callback-pkce'

export default {
    name: 'authorization-code-pkce',
    // ****************************** //
    // Function
    // ****************************** //
    authorize: function() {
        // 配置
        var url = 'http://auth-server:9000/oauth2/authorize?'
        var codeVerifier = pkceUtil.genCodeVerifier()
        var code_challenge = pkceUtil.genCodeChallenge(codeVerifier)
        var config = {
            client_id: client_id,
            code_challenge: code_challenge, // 需要计算
            code_challenge_method: code_challenge_method,
            response_type: response_type,
            scope: scope,
            redirect_uri: redirect_uri,
        }
        url += querystring.stringify(config);
        console.log('authorize url => ' + url)
        // 弹窗   
        dialogUtil.openWindow({url: url})
    },
    getCode: function (callback) {
        var parse = querystring.parse(location.search)
        console.info('parse => ' + parse)
        var code = parse["?code"]
        console.info('code => ' + code)
        if (code !== null || code !== undefined || code !== '') {
            localStorage.setItem("code", code)
            callback(code)
            return true;
        } else {
            return false;
        }
    },
    token: function(callback) {
        // 配置
        var url = '/springauthhost/oauth2/token'
        var config = {
            grant_type: grant_type,
            redirect_uri: redirect_uri,
            code: localStorage.getItem('code'), // 授权码
            code_verifier: localStorage.getItem('codeVerifier'), // 需要计算
        }
        var headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
        // 请求
        axios
        .post(
            url, 
            querystring.stringify(config), 
            {headers: headers}
        )
        .then(function (response) {
            // 回写
            localStorage.setItem("access_token", response.data.access_token)
            callback(response.data.access_token)
            console.info('[dialog] [access_token] <= ' + response.data.access_token)
            // 关窗
            window.close();
        })
        .catch(function(error){
            localStorage.setItem("access_token", '')
            callback('')
            console.error(JSON.stringify(error))
        });
    },
    logout: function() {
        // 清空本地access_token,code
        localStorage.setItem('access_token', '')
        localStorage.setItem("code", '');
        // 配置
        var url = 'http://auth-server:9000/logout?'
        var codeVerifier = pkceUtil.genCodeVerifier()
        var code_challenge = pkceUtil.genCodeChallenge(codeVerifier)
        var config = {
            client_id: client_id,
            code_challenge: code_challenge, // 需要计算
            code_challenge_method: code_challenge_method,
            response_type: response_type,
            scope: scope,
            redirect_uri: redirect_uri,
        }
        url += querystring.stringify(config)
        // 弹窗   
        dialogUtil.openWindow({url: url})
    }
}