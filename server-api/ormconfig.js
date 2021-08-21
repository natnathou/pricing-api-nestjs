let config = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  logging: true,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    config = {
      ...config,
      entities: ['**/*.entity.js'],
      database: 'postgres',
      migrationsRun: true,
    };
    break;
  case 'test':
    config = {
      ...config,
      entities: ['**/*.entity.ts'],
      database: 'test',
      migrationsRun: true,
    };
    break;
  case 'production':
    break;
  default:
    break;
}

module.exports = config;
