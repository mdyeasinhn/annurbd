const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const DATA_FILE = path.join(__dirname, 'data.json');
const SECRET_KEY = 'bal-key';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,           
    secure: false,
    auth: {
        user: "noobsapiserver@gmail.com",
        pass: "atcm njll pien xwln"
    },
    tls: {
        rejectUnauthorized: false
    }
});



// Multer setup with 50MB limit
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'cv';
        if (file.fieldname === 'videoCv') folder = 'video';
        if (file.fieldname === 'image1' || file.fieldname === 'image2') folder = 'image';
        const dir = path.join(__dirname, 'public', 'uploads', folder);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}
app.use(cors({
    origin: 'https://annurbd.net',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}));

app.options('/*', cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Middleware
const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('<script>alert("Access Denied! Please login first."); window.location.href="/login";</script>');
    }
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(401).send('<script>alert("Session expired. Please login again."); window.location.href="/login";</script>');
    }
};

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center;margin-top:40vh;font-size:48px;">Server is running ðŸš€</h1>');
});

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/upload', protect, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'upload.html'));
// });

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin12') {
        const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
        res.status(200).send('/upload');
    } else {
        res.send('<script>alert("Invalid Credentials"); window.location.href="/login";</script>');
    }
});

app.get('/api/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const initialLength = data.length;
    data = data.filter(u => u.id.toString() !== id.toString());
    
    if (data.length === initialLength) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'User deleted successfully' });
});

app.post('/api/upload', (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('<script>alert("File too large! Max 50MB allowed."); window.history.back();</script>');
        }
    }
    next();
}, upload.fields([
    { name: 'videoCv', maxCount: 1 }, 
    { name: 'cvFile', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'certFile', maxCount: 1 },
    { name: 'markFile', maxCount: 1 },
    { name: 'passportFile', maxCount: 1 }
]), (req, res) => {
    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const editId = req.body.id;
    
    let existingUser = null;
    if (editId) {
        existingUser = data.find(u => u.id.toString() === editId.toString());
    }

    const userData = {
        ...req.body,
        firstName: (req.body.firstName || '').toUpperCase(),
        middleName: (req.body.middleName || '').toUpperCase(),
        lastName: (req.body.lastName || '').toUpperCase(),
        videoPath: req.files['videoCv'] ? `https://server.annurbd.net/uploads/video/${req.files['videoCv'][0].filename}` : (existingUser ? existingUser.videoPath : null),
        cvPath: req.files['cvFile'] ? `https://server.annurbd.net/uploads/cv/${req.files['cvFile'][0].filename}` : (existingUser ? existingUser.cvPath : null),
        image1Path: req.files['image1'] ? `https://server.annurbd.net/uploads/image/${req.files['image1'][0].filename}` : (existingUser ? existingUser.image1Path : null),
        image2Path: req.files['image2'] ? `https://server.annurbd.net/uploads/image/${req.files['image2'][0].filename}` : (existingUser ? existingUser.image2Path : null),
        certPath: req.files['certFile'] ? `https://server.annurbd.net/uploads/cv/${req.files['certFile'][0].filename}` : (existingUser ? existingUser.certPath : null),
        markPath: req.files['markFile'] ? `https://server.annurbd.net/uploads/cv/${req.files['markFile'][0].filename}` : (existingUser ? existingUser.markPath : null),
        passportPath: req.files['passportFile'] ? `https://server.annurbd.net/uploads/cv/${req.files['passportFile'][0].filename}` : (existingUser ? existingUser.passportPath : null),
        date: existingUser ? existingUser.date : new Date().toISOString().split('T')[0]
    };

    if (existingUser) {
        const index = data.findIndex(u => u.id.toString() === editId.toString());
        userData.id = existingUser.id; // Keep original ID
        data[index] = userData;
    } else {
        userData.id = Date.now();
        data.push(userData);
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
     res.redirect('https://annurbd.net/%E3%82%A2%E3%83%B3%E3%83%8C%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%90%E3%83%B3%E3%82%B0%E3%83%A9%E3%83%87%E3%82%B7%E3%83%A5%E9%80%81%E5%87%BA%E6%A9%9F%E9%96%A2/upload.html')

});

app.post('/send', upload.single('cvFile'), async (req, res) => {

        try {
            const {
                name,
                email,
                phone,
                visa,
                message
            } = req.body;

            // Attachment prepare
            const attachments = [];

            if (req.file) {
                attachments.push({
                    filename: req.file.originalname,
                    path: req.file.path
                });
            }

            // Email content
            const mailOptions = {
                from: `"An Nur Website" <noobsapiserver@gmail.com>`,
                to: 'annurjlanguage101@gmail.com',
                subject: 'New Contact Form Submission',
                html: `
                    <h2>New Contact Request</h2>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Phone:</b> ${phone}</p>
                    <p><b>Visa Type:</b> ${visa}</p>
                    <p><b>Message:</b><br>${message}</p>
                    <p><b>Date:</b> ${new Date().toLocaleString()}</p>
                `,
                  attachments
            };

            await transporter.sendMail(mailOptions);

            console.log('📧 Contact email sent');

            // res.send(`
            //     <script>
            //         alert("Message sent successfully!");
            //         window.location.href = "https://annurbd.net";
            //     </script>
            // `);
            res.send("OK");


        } catch (error) {
            console.error('❌ Send Route Error:', error.message);
            res.send(`
                <script>
                    alert("Failed to send message. Please try again.");
                    window.history.back();
                </script>
            `);
        }
    }
);


app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});