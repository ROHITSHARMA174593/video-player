// src/pages/api/hello.ts
import { connectionString } from "@/lib/dbConnect";
import Student, { IStudent } from "@/lib/Student";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Interface for API response
interface ApiResponse {
  message: string;
  success: boolean;
  students?: IStudent[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    if (mongoose.connections[0].readyState !== 1) {
      console.log("Connecting to MongoDB...");
      if (!connectionString) {
        throw new Error("MONGODB_URI is not defined");
      }
      await mongoose.connect(connectionString, { connectTimeoutMS: 10000 });
      console.log("MongoDB connected successfully");
    }
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    return res
      .status(500)
      .json({
        message: `MongoDB connection failed: ${error.message}`,
        success: false,
      });
  }

  if (req.method === "POST") {
    try {
      const { videoURL } = req.body as { videoURL?: string };
      if (!videoURL || typeof videoURL !== "string" || videoURL.trim() === "") {
        return res
          .status(400)
          .json({ message: "Valid videoURL is required", success: false });
      }

      const newStudent = new Student({ videoURL });
      await newStudent.save();
      return res 
        .status(200)
        .json({ message: "Student data uploaded successfully", success: true });
    } catch (error: any) {
      console.error("Error uploading student data:", error);
      return res
        .status(500)
        .json({
          message: `Error uploading student data: ${error.message}`,
          success: false,
        });
    }
  } else if (req.method === "GET") {
    try {
      const students: IStudent[] = await Student.find().exec();
      // Convert Mongoose documents to plain objects for API response
      const plainStudents = students.map((student) => ({
        _id: student._id.toString(),
        videoURL: student.videoURL,
        __v: student.__v,
      }));
      return res
        .status(200)
        .json({
          message: "Students fetched successfully",
          success: true,
          students: plainStudents,
        });
    } catch (error: any) {
      console.error("Error fetching student data:", error);
      return res
        .status(500)
        .json({
          message: `Error fetching student data: ${error.message}`,
          success: false,
        });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body as { id?: string };
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ message: "Valid ID is required", success: false });
      }

      const result = await Student.findByIdAndDelete(id);
      if (!result) {
        return res
          .status(404)
          .json({ message: "Student not found", success: false });
      }

      return res
        .status(200)
        .json({ message: "Student deleted successfully", success: true });
    } catch (error: any) {
      console.error("Error deleting student:", error);
      return res
        .status(500)
        .json({
          message: `Error deleting student: ${error.message}`,
          success: false,
        });
    }
  } else {
    return res
      .status(405)
      .json({ message: "Method Not Allowed", success: false });
  }
}








