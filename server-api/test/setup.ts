import { Connection, createConnection } from 'typeorm';
import { AuroraDataApiConnectionOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions';
import config from '../ormconfig';

let connection: Connection;
global.beforeEach(async () => {
  connection = await createConnection(config as AuroraDataApiConnectionOptions);
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.delete({});
  }

  await connection.close();
});
