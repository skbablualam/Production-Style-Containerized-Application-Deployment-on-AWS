const pool = require('../config/db');

exports.createVideo = async (req, res, next) => {
  try {
    const { title, description, user_id } = req.body;

    const result = await pool.query(
      'INSERT INTO videos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

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
