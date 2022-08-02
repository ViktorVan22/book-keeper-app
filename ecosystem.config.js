module.exports = {
  apps: [
    {
      name: "book-keeper-app",
      script: "pm-server.js",
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "8.130.17.206",
      ref: "origin/main",
      repo: "git@github.com:ViktorVan22/book-keeper-app.git",
      path: "/workspace/book-keeper-app",
      "post-deploy":
        "git reset --hard && git checkout main && git pull && yarn install --production=false && yarn run build:release && pm2 startOrReload ecosystem.config.js", // -production=false 下载全量包
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
