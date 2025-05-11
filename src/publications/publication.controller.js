import Publications from './publication.model.js';
import Comments from "../comments/comment.model.js"

export const createPublication = async (req, res) => {
  try {
    const { title, content, course, category } = req.body;

    const newPublication = await Publications.create({
      title,
      content,
      course,
      category
    });

    res.status(201).json({
      message: "Publication created",
      publication: newPublication
    });
  } catch (err) {
    res.status(500).json({
      error: "Error creating publication",
      message: err.message
    });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const publication = await Publications.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    await Comments.deleteMany({ _id: { $in: publication.comments } });
    await publication.deleteOne();

    res.status(200).json({
      message: 'Publication successfully deleted',
      details: {
        title: publication.title,
        id: publication._id
      }
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error deleting publication',
      message: err.message
    });
  }
};
