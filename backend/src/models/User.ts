import mongoose, { Schema, Document } from 'mongoose';

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
      delete (ret as any)._id;
      delete (ret as any).__v;
    }
  },
  toObject: { virtuals: true }
});

export default mongoose.model<IUser>('User', UserSchema);
