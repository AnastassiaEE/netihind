module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || 'netihind-default',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.APP_HOST || '127.0.0.1',
        PORT: process.env.APP_PORT || 8080,
      },
    },
  ],
};
