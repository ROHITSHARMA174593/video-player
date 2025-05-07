import { connectionString } from "@/lib/dbConnect";
import Student from "@/lib/Student";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, class: studentClass, rollNo, phone } = req.body;

      if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(connectionString ?? "");
      }

      const newStudent = new Student({
        name,
        class: studentClass,
        rollNo,
        phone,
      });

      await newStudent.save();

      res
        .status(200)
        .json({ message: "Student data uploaded successfully", success: true });
    } catch (error) {
      console.error("Error uploading student data:", error);
      res
        .status(500)
        .json({ message: "Error uploading student data", success: false });
    }
  } else if (req.method === "GET") {
    try {
      if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(connectionString ?? "");
      }

      const students = await Student.find(); //

      res.status(200).json({ students });
    } catch (error) {
      console.error("Error fetching student data:", error);
      res
        .status(500)
        .json({ message: "Error fetching student data", success: false });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ message: "ID is required", success: false });
      }

      if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(connectionString ?? "");
      }

      await Student.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: "Student deleted successfully", success: true });
    } catch (error) {
      console.error("Error deleting student:", error);
      res
        .status(500)
        .json({ message: "Error deleting student", success: false });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
