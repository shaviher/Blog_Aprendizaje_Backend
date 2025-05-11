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

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatComments = (comments) => {
  return comments.map(comment => ({
    ...comment,
    date: formatDate(comment.date)  
  }));
};

export const listPublications = async (req, res) => {
  try {
    const filter = {};
    if (req.body?.category) filter.category = req.body.category;
    if (req.body?.course) filter.course = req.body.course;

    const publications = await Publications
      .find(filter)
      .populate('comments', 'author content date -_id')
      .sort('-date')
      .lean();

    const formatted = publications.map(pub => ({
      ...pub,
      date: formatDate(pub.date),
      comments: formatComments(pub.comments || []) 
    }));

    res.status(200).json({ success: true, publications: formatted });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error listing publications',
      error: err.message
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
