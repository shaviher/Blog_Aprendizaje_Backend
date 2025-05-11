import Comments from "./comment.model.js"
import Publications from "../publications/publication.model.js";

export const addComment = async (req, res) => {
    try {
        const { author, content } = req.body;
        const { pid } = req.params;

        const publication = await Publications.findById(pid);
        if (!publication) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        const comment = new Comments({ author, content });
        await comment.save();

        publication.comments.push(comment._id);
        await publication.save();

        res.status(201).json({
            success: true,
            msg: 'Comment added successfully'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Server error',
            error: error.message
        });
    }
};
