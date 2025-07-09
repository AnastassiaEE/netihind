module.exports = {
  apps: [
    {
      name: 'netihind-test',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        HOST: '127.2.46.244',
        PORT: 8080,
      },
    },
  ],
};
