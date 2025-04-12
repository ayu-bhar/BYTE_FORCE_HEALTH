import express from 'express';
import mongoose from 'mongoose';
import { Profile } from './modles/profile.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

let connect = await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/', async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const newUser = new Profile(req.body);
        await newUser.save();
        console.log('User saved:', newUser);
        res.status(201).send('User saved');
        } catch (err) {
        console.error(err);
        console.log('Error saving user:', err);
        res.status(500).send('Server error');
    }
});

app.get('/check', async (req, res) => {
    const { username } = req.query;
    try {
        const user = await Profile.findOne({ UserName: username });
        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (err) {
        console.error('Error checking username:', err);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ error: 'userName and password are required' });
    }

    try {
        const user = await Profile.findOne({
            $or: [{ UserName: userName }, { Email: userName }]
        });
        const { Password, _id, __v, ...userWithoutPassword } = user.toObject();
        if (user && user.Password === password) {
            return res.status(200).json({ valid: true, message: 'User validated successfully', user: userWithoutPassword });
        } else {
            return res.status(200).json({ valid: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error validating user:', err);
        res.status(500).send('Server error');
    }
});

app.get("/api/places", async (req, res) => {
    const { lat, lng, type } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${process.env.GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.results);
    } catch (error) {
        console.error("Google API error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});