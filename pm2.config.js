module.exports = {
  apps: [
    {
      name: 'alemont-bot',
      interpreter: './node_modules/.bin/ts-node',
      interpreter_args: '-P ../ -r tsconfig-paths/register',
      script: './index.ts',
      exec_mode: 'cluster',
      instances: 1,
      max_memory_restart: '1G',
      autorestart: true,
      autoput: '/dev/null',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      source_map_support: false,
      error_file: './logs/alemont-bot/err.log',
      out_file: './logs/alemont-bot/out.log',
      node_args: [],
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}