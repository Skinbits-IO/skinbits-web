module.exports = {
  apps: [
    {
      name: 'skinbits-web',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 80,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    },
    {
      name: 'skinbits-web-dev',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 80,
      },
      error_file: './logs/err-dev.log',
      out_file: './logs/out-dev.log',
      log_file: './logs/combined-dev.log',
      time: true
    },
    {
      name: 'skinbits-web-test',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'test',
        PORT: 80,
      },
      error_file: './logs/err-test.log',
      out_file: './logs/out-test.log',
      log_file: './logs/combined-test.log',
      time: true
    }
  ]
};
