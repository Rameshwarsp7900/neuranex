const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase
const serviceAccount = require('./firebaseConfig.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<your-database-name>.firebaseio.com'
});
const db = admin.firestore();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email } = req.body;
    db.collection('users').add({ name, email })
        .then(() => res.send('Registration successful!'))
        .catch(error => res.send('Error: ' + error.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
