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

export const getPublicationById = async (req, res) => {
  try {
    const publication = await Publications
      .findById(req.params.id)
      .populate('comments', 'author content date -_id')
      .lean();

    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    const formatted = {
      ...publication,
      date: formatDate(publication.date),
      comments: formatComments(publication.comments || [])
    };

    res.status(200).json({
      message: 'Publication found',
      publication: formatted
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error fetching publication',
      message: err.message
    });
  }
};
