import { Schema, model } from 'mongoose';

const commentsSchema = Schema({
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxLength: [30, 'Author cannot exceed 30 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        maxLength: [500, 'Content cannot exceed 500 characters']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model("Comments", commentsSchema);
