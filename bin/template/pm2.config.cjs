const ars = process.argv.slice(4)
module.exports = {
  apps: [
    {
      name: 'alemonc',
      script: './.output/server/index.mjs',
      port: '3000',
      instances: 1,
      autorestart: true,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      watch: false,
      autodump: true,
      merge_logs: true,
      error_file: './logs/server-err.log',
      out_file: './logs/server-out.log',
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
    },
    {
      name: 'alemonb',
      script: 'pm2-run.js',
      instances: 1,
      autorestart: true,
      exec_mode: 'cluster',
      max_memory_restart: '2G',
      cron_restart: '0 */1 * * *',
      args: ars,
      watch: false,
      autodump: true,
      merge_logs: true,
      error_file: './logs/bot-err.log',
      out_file: './logs/bot-out.log',
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
    }
  ]
}
