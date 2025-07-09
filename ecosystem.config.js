module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.APP_HOST,
        PORT: process.env.APP_PORT,
      },
    },
  ],
};
