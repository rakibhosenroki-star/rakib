/**
 * MD RAKIB HASAN - SKILL CONTROLLER
 * Full CRUD for portfolio skills
 */

const { query, memoryStore } = require('../config/db');

exports.getSkills = async (req, res) => {
  try {
    const result = await query('SELECT * FROM skills ORDER BY sort_order ASC, id ASC');
    const skills = result.rows && result.rows.length > 0 ? result.rows : memoryStore.skills;
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch skills.' });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { name, category, level, icon, description } = req.body;
    if (!name || level === undefined) {
      return res.status(400).json({ success: false, message: 'Skill name and level are required.' });
    }

    const sql = `
      INSERT INTO skills (name, category, level, icon, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await query(sql, [name, category || 'Frontend', level, icon || 'code', description || '']);
    const newSkill = result.rows && result.rows.length > 0 ? result.rows[0] : {
      id: Date.now(),
      name,
      category: category || 'Frontend',
      level,
      icon: icon || 'code',
      description: description || ''
    };

    memoryStore.skills.push(newSkill);
    res.status(201).json({ success: true, message: 'Skill added.', data: newSkill });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create skill.' });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level, icon, description } = req.body;

    const sql = `
      UPDATE skills
      SET name = COALESCE($1, name),
          category = COALESCE($2, category),
          level = COALESCE($3, level),
          icon = COALESCE($4, icon),
          description = COALESCE($5, description)
      WHERE id = $6
      RETURNING *;
    `;
    const result = await query(sql, [name, category, level, icon, description, id]);

    // Update in-memory fallback
    const index = memoryStore.skills.findIndex(s => s.id == id);
    if (index !== -1) {
      Object.assign(memoryStore.skills[index], req.body);
    }

    res.json({ success: true, message: 'Skill updated.', data: result.rows[0] || memoryStore.skills[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update skill.' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM skills WHERE id = $1', [id]);
    memoryStore.skills = memoryStore.skills.filter(s => s.id != id);
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete skill.' });
  }
};
