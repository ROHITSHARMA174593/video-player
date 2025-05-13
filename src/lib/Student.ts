// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//   videoURL: { type: String, required: true },
// });

// const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

// export default Student;





// src/lib/Student.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

// Interface for the document
export interface IStudent extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id as ObjectId
  videoURL: string;
  __v?: number;
}

// Schema definition
const studentSchema: Schema<IStudent> = new mongoose.Schema<IStudent>({
  videoURL: { type: String, required: true },
});

// Model definition with explicit collection name
const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema, 'Students');

export default Student;





