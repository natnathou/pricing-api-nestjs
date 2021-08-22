let config = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PG_DATABASE,
};

switch (process.env.NODE_ENV) {
  case 'development':
    config = {
      ...config,
      synchronize: true,
      logging: true,
      entities: ['**/*.entity.js'],
      database: 'postgres',
      migrationsRun: false,
    };
    break;
  case 'test':
    config = {
      ...config,
      synchronize: true,
      logging: false,
      entities: ['**/*.entity.ts'],
      database: 'test',
      migrationsRun: false,
    };
    break;
  case 'production':
    config = {
      ...config,
      synchronize: false,
      logging: false,
      entities: ['**/*.entity.js'],
      database: 'postgres',
      migrationsRun: true,
      migrations: ['migrations/*.js'],
      cli: {
        migrationsDir: 'migrations',
      },
    };
    break;
  default:
    break;
}

module.exports = config;
