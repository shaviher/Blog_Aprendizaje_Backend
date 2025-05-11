import { Schema, model } from 'mongoose';
import '../comments/comment.model.js';

const publicationsSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [50, 'Title cannot exceed 50 characters']
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
    },
    course: {
        type: String,
        required: [true, 'Course is required'],
        enum: ['WORKSHOP', 'TECHNOLOGY', 'SUPERVISED PRACTICE']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['CODE', 'INFOGRAPHIC', 'CONCEPT MAP', 'MENTAL MAP']
    },
    comments: [{
        type: Schema.ObjectId,
        ref: "comments",
        default: []
    }]
}, {
    versionKey: false,
    timestamps: false
});

publicationsSchema.methods.toJSON = function () {
    const { _id, ...publication } = this.toObject();
    publication.pid = _id;
    return publication;
};

export default model('Publications', publicationsSchema);
