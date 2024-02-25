const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
// middleware
app.use(cors());
app.use(express.json());

// Routes

// get all courses
app.get('/cursos', async (req, res) => {
    try {
        const allCourses = await pool.query('SELECT * FROM grade_academica');
        res.json(allCourses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// create a course
app.post('/detalhes', async (req, res) => {
    try {
        const { curso, professor, sala, horainicio, horatermino } = req.body;
        const newCourse = await pool.query(
            'INSERT INTO grade_academica (curso, professor, sala, horainicio, horatermino) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [curso, professor, sala, horainicio, horatermino]
        );
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
