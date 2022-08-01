module.exports = {
  apps: [
    {
      name: "book-keeper-app",
      script: "./dist/index.html",
      env_production: {
        NODE_ENV: "production",
        PORT: 5021,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3010,
      },
    },
  ],
  // deploy: {
  //   production: {
  //     user: "root",
  //     host: "8.130.17.206",
  //     ref: "origin/main",
  //     repo: "git@github.com:ViktorVan22/book-keeper-app.git",
  //     path: "/workspace/book-keeper-app",
  //     "post-deploy":
  //       "git reset --hard && git checkout main && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.ts",
  //     env: {
  //       NODE_ENV: "production",
  //     },
  //   },
  // },
};
