import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNo: { type: String, required: true },
  phone: { type: String, required: true },
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
