import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInteraction extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  createdAt: Date;
}

const InteractionSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Interaction: Model<IInteraction> = mongoose.models.Interaction || mongoose.model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;
