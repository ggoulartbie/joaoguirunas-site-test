module.exports = {
  apps: [
    {
      name: 'academy-dev',
      script: 'pnpm',
      args: 'dev',
      watch: false,
      autorestart: true,
      restart_delay: 1000,
      max_restarts: 20,
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--max-old-space-size=3072',
      },
    },
  ],
}
