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
   *   @property {String} `info.name`
   *   @property {String} `info.lastname`
   *   @property {String} `info.email`
   *   @property {String} `info.password`
   * @returns {Promise <{_id: mongoose.Types.ObjectId, name: String, lastname:String, email: String, password:String, creationDate: Date, verificated:Boolean, __v: Number}>}
   * @throws {Error}
   */
  async createUser(info) {
    try {
      info.name = info.name.toUpperCase().trim();
      info.lastname = info.lastname.toUpperCase().trim();
      info.email = info.email.toLowerCase().trim();
      info.password = await bcryptjs.hash(info.password.trim(), 10);

      const newUser = new User(info);

      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }
  /**
   * Retrieve an user by their id.
   *
   * @param {mongoose.Types.ObjectId} id
   * @returns {Promise <{_id: mongoose.Types.ObjectId, name: String, lastname:String, email: String, password:String, creationDate: Date, verificated:Boolean, __v: Number}>}
   * @throws {Error}
   */
  async findByID(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  }
  /**
   * Retrieves all users stored in the user collection.
   *
   * @returns {Promise<[{_id: mongoose.Types.ObjectId, name: String, lastname:String, email: String, password:String, creationDate: Date, verificated:Boolean, __v: Number}]>}
   * @throws {Error}
   */
  async getAll() {
    try {
      return await User.find({}, { password: false });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates an existing user.
   *
   * @param {mongoose.Types.ObjectId} id - The user's ID.
   * @param {{_id: mongoose.Types.ObjectId,email: String, password: String}} info The info to update the user.
   *  @property {String} `info.email` - The user's email. ***optional***
   *  @property {String} `info.password` - The user's password. ***optional***
   * @returns {Promise<{_id: mongoose.Types.ObjectId, name: String, lastname:String, email: String, password:String, creationDate: Date, verificated:Boolean, __v: Number}>}
   * @throws {Error}
   */
  async updateUser(id, info) {
    try {
      // If the following properties are provided, the transformation will take place.
      // Otherwise, no transformation will occur for the respective property.
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
