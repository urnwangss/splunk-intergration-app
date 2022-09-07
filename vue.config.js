const antdCustomTheme = require("./src/ant-design-vue/custom-theme");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: false,
  devServer: {
    proxy: {
      "/arcana-api/app/proxy/mysql-integration-app": {
        // target: "http://192.168.100.10:7085/mysql-integration-app",
        target:
          "http://192.168.1.235:7088/arcana-api/app/proxy/mysql-integration-app",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/arcana-api/app/proxy/splunk-integration-app": "",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: antdCustomTheme,
        javascriptEnabled: true,
      },
    },
  },
  productionSourceMap: false, //生成环境不生成map文件
  // outputDir: "ips-intergration-app",
  outputDir: "dist",
};
