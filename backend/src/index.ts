import { createConnection } from 'typeorm';
import { User } from './entity/User';

const main = async () => {
  const { manager } = await createConnection();
  const user = new User();

  user.firstName = 'luan';
  user.lastName = 'oliveira';
  user.email = 'luan@luan';
  user.password = '12345';

  await manager.save(user);
};

main();
