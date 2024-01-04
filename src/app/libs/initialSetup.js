import bcryptjs from 'bcryptjs';
import Role from '../models/Role.js';
import User from '../models/User.js';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) {
      return;
    }

    console.log('GENERATING ROLES...');
    await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save(),
    ]);

    console.log('Roles created');
  } catch (err) {
    console.error('Error creating roles:', err);
    throw err;
  }
};

export const createUser = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) {
      return;
    }

    const info = {
      name: process.env.CLIENT_NAME,
      lastname: process.env.CLIENT_LASTNAME,
      email: process.env.CLIENT_EMAIL,
      password: process.env.CLIENT_SECRET,
      verificated: true,
      roles: ['admin'],
    };

    const SALT = await bcryptjs.genSalt(10);

    info.name = info.name.toUpperCase().trim();
    info.lastname = info.lastname.toUpperCase().trim();
    info.email = info.email.toLowerCase().trim();
    info.password = await bcryptjs.hash(info.password.trim(), SALT);

    console.log('GENERATING FIRST USER...');

    let newUser = new User(info);

    const foundRoles =
      info.roles && info.roles.length > 0
        ? await Role.find({ name: { $in: info.roles } }, { name: false })
        : await Role.find({ name: 'user' }, { name: false });

    newUser.roles = foundRoles.map((role) => role._id);

    newUser = await newUser.save();
    console.log('First user created');
  } catch (err) {
    console.error('Error creating first user:', err);
    throw err;
  }
};
