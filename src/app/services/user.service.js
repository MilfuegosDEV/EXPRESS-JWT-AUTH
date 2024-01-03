import mongoose from 'mongoose';
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcryptjs from 'bcryptjs';

export default class UserService {
  async createUser(info) {
    try {
      const SALTS = await bcryptjs.genSalt(10);

      info.name = info.name.toUpperCase().trim();
      info.lastname = info.lastname.toUpperCase().trim();
      info.email = info.email.toLowerCase().trim();
      info.password = await bcryptjs.hash(info.password.trim(), SALTS);

      let newUser = new User(info);

      const foundRoles =
        !info.roles || info.roles < 0
          ? await Role.find({ name: 'user' }, { name: false })
          : await Role.find({ name: { $in: info.roles } }, { name: false });

      newUser.roles = foundRoles.map((role) => role._id);

      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  async findOwnAccount(ID) {
    try {
      return await User.findById(ID).populate('roles');
    } catch (err) {
      throw err;
    }
  }

  async findByID(ID) {
    try {
      return await User.findById(ID, { password: false }).populate('roles');
    } catch (err) {
      throw err;
    }
  }

  async findbyEmail(email) {
    try {
      return await User.findOne({ email: email }).populate('roles');
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      return await User.find({}, { password: false }).populate('roles');
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id, info) {
    try {
      info.email && (info.email = info.email.toLowerCase().trim());
      info.password &&
        (info.password = await bcryptjs.hash(info.password.trim(), 10));

      const result = await User.findByIdAndUpdate(id, info);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
