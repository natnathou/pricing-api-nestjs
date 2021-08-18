import { getConnection } from 'typeorm';

global.afterEach(async () => {
  const conn = getConnection();
  const entities = conn.entityMetadatas;

  for (const entity of entities) {
    const repository = conn.getRepository(entity.name);
    await repository.clear();
    await conn.close();
  }
});
