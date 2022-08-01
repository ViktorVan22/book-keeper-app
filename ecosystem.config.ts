module.exports = {
  apps: [
    {
      name: "book-keeper-app",
      script: "server.js",
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
        "git reset --hard && git checkout main && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
