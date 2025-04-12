import express from 'express';
import mongoose from 'mongoose';
import { Profile } from './modles/profile.js';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
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

app.get('/api/medical-shops', async (req, res) => {
    try {
      const { lat, lng, radius = 1500 } = req.query;
      
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',{
          params: {
            location: `${lat},${lng}`,
            radius: radius,
            type: 'pharmacy', // Google's type for medical shops
            keyword: 'medical',
            key: process.env.GOOGLE_MAPS_API_KEY
          }
        });
      
      // Filter and format results
      const medicalShops = response.data.results.map(shop => ({
        id: shop.place_id,
        name: shop.name,
        address: shop.vicinity,
        location: shop.geometry.location,
        rating: shop.rating,
        openNow: shop.opening_hours?.open_now
      }));
  
      res.json(medicalShops);
    } catch (error) {
      console.error('Error fetching medical shops:', error);
      res.status(500).json({ error: 'Failed to fetch medical shops' });
    }
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});