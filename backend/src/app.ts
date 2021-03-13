import 'reflect-metadata';
import { createConnection } from 'typeorm';

const main = async () => {
  const { manager } = await createConnection();
};

main();
