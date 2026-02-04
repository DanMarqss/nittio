import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  photo: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
}, {
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  },
  toObject: { virtuals: true }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
