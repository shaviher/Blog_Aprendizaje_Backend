import Publications from './publication.model.js';


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
