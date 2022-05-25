module.exports = {
    devServer: {
      open: process.platform === 'darwin',
      disableHostCheck: true,
      //    host: 'www.test.com',//如果是真机测试，就使用这个IP
      host: '0.0.0.0',
      port: 1234,
      https: false,
      hotOnly: false,
      // 代理配置（需要重启服务）
      proxy: {
        // 如果请求地址以/api打头,就出触发代理机制
        '/authhost': {
          //将 http://localhost:9090 影射为/authhost。注意：必须用localhost，不能用ip。
          //target: 'http://localhost:9090',
         target: 'http://keycloakhost:9090',
          //    		secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/authhost': '' //路径重写  
          }
        },
        '/datahost': {
          //将 http://localhost:8081 影射为/datahost。注意：必须用localhost，不能用ip。
          target: 'http://localhost:8081',
          //    		secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/datahost': '' //路径重写  
          }
        }
      },
      before: app => { }
    }
  }
  