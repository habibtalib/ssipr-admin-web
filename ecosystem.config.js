module.exports = {
  apps: [
    {
      name: 'ipr_admin',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    staging: {
      user: 'ubuntu',
      host: '18.139.22.150',
      ref: 'origin/master',
      repo: 'git@github.com:smarttechtank/ssipr-admin-web.git',
      path: '/home/ubuntu/apps/ipr_admin',
      ssh_options: 'ForwardAgent=yes',
      env: {
        NODE_ENV: 'production'
      },
      'post-deploy':
        'sudo yarn && sudo yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    },
    production: {
      user: 'deploy',
      host: '13.251.234.31',
      ref: 'origin/master',
      repo: 'git@github.com:smarttechtank/ssipr-admin-web.git',
      path: '/home/deploy/apps/ipr_admin',
      ssh_options: 'ForwardAgent=yes',
      'post-deploy':
        'sudo yarn && sudo yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
