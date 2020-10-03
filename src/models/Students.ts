import mongoose, { Schema, Document } from "mongoose";

interface Student extends Document {
     name: string
     surname: string
     description: string
}

const StudentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }

},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export default mongoose.model<Student>('Student', StudentSchema, 'Student')
