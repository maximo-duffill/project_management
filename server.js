
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

function generateActivationCode() {
  return crypto.randomBytes(16).toString('hex');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxrayfoxx@gmail.com',
    pass: '6458dobi2001D',
  },
});


// Configuración de CORS
app.use(cors());

app.use(bodyParser.json()); // Parse JSON requests

// Configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_management',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ejemplo de endpoint para obtener proyectos
app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    // Check if the user exists in the database
    const [user] = await db.promise().query('SELECT * FROM project_management.users WHERE email = ?', [email]);

    if (!user.length) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }

    const hashedPassword = user[0].password_hash;

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // Passwords match, authentication successful
      return res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // Passwords do not match
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Generate activation code
  const codActivacion = generateActivationCode();

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database with the activation code
    const [result] = await db
  .promise()
  .query('INSERT INTO project_management.users (email, password_hash, codActivacion) VALUES (?, ?, ?)', [
    email,
    hashedPassword,
    codActivacion,
  ]);

    if (result.insertId) {
      // Send activation email
      //const activationLink = `http://gmail.com/activate?code=${codActivacion}`;
      //await transporter.sendMail({
        //from: 'xxrayfoxx@gmail.com',
        //to: email,
        //subject: 'Activate Your Account',
        //html: `<p>Click the following link to activate your account: <a href="${activationLink}">${activationLink}</a></p>`,
      //});

      return res.status(201).json({ success: true, message: 'User created successfully. Activation email sent.' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/activate', async (req, res) => {
  const { code } = req.query;

  try {
    // Check if the activation code is valid
    const [user] = await db.promise().query('SELECT * FROM project_management.users WHERE codActivacion = ?', [code]);

    if (user.length > 0) {
      // Activate the user's account (update the database)
      await db.promise().query('UPDATE project_management.users SET activo = 1 WHERE codActivacion = ?', [code]);
      return res.status(200).send('Account activated successfully.');
    } else {
      return res.status(400).send('Invalid activation code.');
    }
  } catch (error) {
    console.error('Activation error:', error);
    return res.status(500).send('Internal server error.');
  }
});

// Otros endpoints para tareas, usuarios, mensajes de chat, etc.

app.post('/projects', async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    // Insert the new project into the database
    const [result] = await db
      .promise()
      .query('INSERT INTO project_management.projects (name, description, start_date, end_date) VALUES (?, ?, ?, ?)', [
        name,
        description,
        startDate,
        endDate,
      ]);

    if (result.insertId) {
      res.status(201).json({ success: true, message: 'Project added successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add project to the database.' });
    }
  } catch (error) {
    console.error('Error adding project to the database:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    // Fetch all projects from the database
    const [projects] = await db.promise().query('SELECT * FROM project_management.projects');

    // Return the list of projects
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.delete('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);

  // Find the index of the project in the array
  const projectIndex = projects.findIndex((project) => project.project_id === projectId);

  if (projectIndex !== -1) {
    // Remove the project from the array
    projects.splice(projectIndex, 1);
    res.json({ success: true, message: 'Project removed successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Project not found' });
  }
});


app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const [users] = await db.promise().query('SELECT * FROM project_management.users');

    // Return the list of users
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});