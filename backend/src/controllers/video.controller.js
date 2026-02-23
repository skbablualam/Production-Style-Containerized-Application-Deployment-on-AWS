const pool = require('../config/db');

// Create Video
exports.createVideo = async (req, res, next) => {
  try {
    const { title, description, user_id } = req.body;

    if (!title || !user_id) {
      return res.status(400).json({ message: "Title and user_id are required" });
    }

    const result = await pool.query(
      'INSERT INTO videos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Get All Videos
exports.getVideos = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM videos ORDER BY id DESC'
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get Video By ID
exports.getVideoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM videos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Update Video
exports.updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      'UPDATE videos SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete Video
exports.deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM videos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    next(err);
  }
};
