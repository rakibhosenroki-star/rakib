/**
 * MD RAKIB HASAN - PROFILE CONTROLLER
 * Get and update personal profile & about pillars
 */

const { query, memoryStore } = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const profRes = await query('SELECT * FROM profiles LIMIT 1');
    const aboutRes = await query('SELECT * FROM about_details LIMIT 1');

    const profile = profRes.rows && profRes.rows.length > 0 ? profRes.rows[0] : memoryStore.profile;
    const about = aboutRes.rows && aboutRes.rows.length > 0 ? aboutRes.rows[0] : memoryStore.about;

    res.json({
      success: true,
      data: {
        profile,
        about
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch profile details.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, headline, tagline, summary, avatar, status_badge, location, email, phone } = req.body;

    const sql = `
      UPDATE profiles
      SET name = COALESCE($1, name),
          headline = COALESCE($2, headline),
          tagline = COALESCE($3, tagline),
          summary = COALESCE($4, summary),
          avatar = COALESCE($5, avatar),
          status_badge = COALESCE($6, status_badge),
          location = COALESCE($7, location),
          email = COALESCE($8, email),
          phone = COALESCE($9, phone),
          updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const result = await query(sql, [name, headline, tagline, summary, avatar, status_badge, location, email, phone]);

    // Update in-memory fallback
    Object.assign(memoryStore.profile, req.body);

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: result.rows && result.rows.length > 0 ? result.rows[0] : memoryStore.profile
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { introduction, interests, goals, journey, ambitions } = req.body;

    const sql = `
      UPDATE about_details
      SET introduction = COALESCE($1, introduction),
          interests = COALESCE($2, interests),
          goals = COALESCE($3, goals),
          journey = COALESCE($4, journey),
          ambitions = COALESCE($5, ambitions),
          updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const result = await query(sql, [introduction, interests, goals, journey, ambitions]);

    // Update in-memory fallback
    Object.assign(memoryStore.about, req.body);

    res.json({
      success: true,
      message: 'About details updated successfully.',
      data: result.rows && result.rows.length > 0 ? result.rows[0] : memoryStore.about
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update about details.' });
  }
};
