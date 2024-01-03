import { createRoles, createUser } from './initialSetup';
export const initialSetup = async () => {
  await createRoles();
  await createUser();
};
