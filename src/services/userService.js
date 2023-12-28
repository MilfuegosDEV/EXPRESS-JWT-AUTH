import mongoose from 'mongoose';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';

/**
 * Actions performed into UserCollection
 */
export default class UserService {
  /**
   * This method creates a new user.
   *
   * @param {{name: String, lastname: String, email: String, password: String}} info
   *   @property {String} info.name
   *   @property {String} info.lastname
   *   @property {String} info.email
   *   @property {String} info.password
   * @returns {Promise <{ name: String, lastname: String, email: String, password: String, creationDate: Date, verificated: Boolean }>}
   * @throws {Error}
   */
  async createUser(info) {
    try {
      info.name = info.name.toUpperCase().trim();
      info.lastname = info.lastname.toUpperCase().trim();
      info.email = info.email.toLowerCase().trim();
      info.password = await bcryptjs.hash(info.password.trim(), 10);

      const newUser = new User({
        name: info.name,
        lastname: info.lastname,
        email: info.email,
        password: info.password,
      });

      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }
  /**
   * Retrieve an user by their id.
   * @param {mongoose.Types.ObjectId} id
   * @returns {Promise <{ name: String, lastname: String, email: String, password: String, creationDate: Date, verificated: Boolean }>}
   * @throws {Error}
   */
  async findByID(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}
