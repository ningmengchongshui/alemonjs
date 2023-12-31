const apps = require('afloat/pm2/cmd.cjs')
module.exports = {
  apps: apps.map(app => ({
    name: app.name,
    script: 'node_modules/afloat/utils/run.js',
    instances: 1,
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '2G',
    cron_restart: '0 */1 * * *',
    args: (() => {
      app.args.push('run')
      return app.args
    })(),
    watch: false,
    autodump: true,
    merge_logs: true,
    error_file: `./logs/${app.name}/err.log`,
    out_file: `./logs/${app.name}/out.log`,
    log_max_size: '10M',
    log_rotate_interval: 'daily',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'production'
    },
    kill_timeout: 5000,
    listen_timeout: 3000,
    max_restarts: 10,
    restart_delay: 5000,
    restart_delay_max: 10000
  }))
}
