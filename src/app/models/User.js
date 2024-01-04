import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificated: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: [{ ref: 'Role', type: Schema.Types.ObjectId }],
  },
  { timestamps: true, versionKey: false }
);

const User = model('User', userSchema);

export default User;
