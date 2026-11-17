/**
 * MD RAKIB HASAN - PROJECT CONTROLLER
 * Full CRUD for showcase projects
 */

const { query, memoryStore } = require('../config/db');

exports.getProjects = async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY featured DESC, created_at DESC');
    const projects = result.rows && result.rows.length > 0 ? result.rows : memoryStore.projects;
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch projects.' });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { title, category, description, image, technologies, live_demo, source_code, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const techArray = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : []);

    const sql = `
      INSERT INTO projects (title, category, description, image, technologies, live_demo, source_code, featured)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const result = await query(sql, [
      title,
      category || 'Full Stack',
      description,
      image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      techArray,
      live_demo || '#',
      source_code || '#',
      featured || false
    ]);

    const newProject = result.rows && result.rows.length > 0 ? result.rows[0] : {
      id: Date.now(),
      title,
      category: category || 'Full Stack',
      description,
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      technologies: techArray,
      live_demo: live_demo || '#',
      source_code: source_code || '#',
      featured: featured || false
    };

    memoryStore.projects.unshift(newProject);
    res.status(201).json({ success: true, message: 'Project added successfully.', data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, image, technologies, live_demo, source_code, featured } = req.body;

    const techArray = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : undefined);

    const sql = `
      UPDATE projects
      SET title = COALESCE($1, title),
          category = COALESCE($2, category),
          description = COALESCE($3, description),
          image = COALESCE($4, image),
          technologies = COALESCE($5, technologies),
          live_demo = COALESCE($6, live_demo),
          source_code = COALESCE($7, source_code),
          featured = COALESCE($8, featured),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *;
    `;
    const result = await query(sql, [title, category, description, image, techArray, live_demo, source_code, featured, id]);

    const index = memoryStore.projects.findIndex(p => p.id == id);
    if (index !== -1) {
      Object.assign(memoryStore.projects[index], req.body);
    }

    res.json({ success: true, message: 'Project updated.', data: result.rows[0] || memoryStore.projects[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM projects WHERE id = $1', [id]);
    memoryStore.projects = memoryStore.projects.filter(p => p.id != id);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
};
