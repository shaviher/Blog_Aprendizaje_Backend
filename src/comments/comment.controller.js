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

export const deleteComment = async (req, res) => {
    try {
        const { cid } = req.params;

        const deletedComment = await Comments.findByIdAndDelete(cid);
        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found'
            });
        }

        await Publications.updateMany(
            { comments: cid },
            { $pull: { comments: cid } }
        );

        res.status(200).json({
            success: true,
            msg: 'Comment deleted successfully',
            data: {
                commentId: deletedComment._id,
                author: deletedComment.author,
                content: deletedComment.content
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting comment',
            error: error.message
        });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = req.body;

        const updatedComment = await Comments.findByIdAndUpdate(
            cid,
            { $set: data },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Comment updated successfully',
            data: {
                commentId: updatedComment._id,
                author: updatedComment.author,
                content: updatedComment.content
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error updating comment',
            error: error.message
        });
    }
};
