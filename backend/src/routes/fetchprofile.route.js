import express from "express"

import path, { dirname } from "path";
import Profile from '../models/flexidataschema.js';

const router = express.Router();
const __dirname = path.resolve(); 







router.get("/initials", async (req, res) => {
  console.log("Fetching initial profiles...(back)");
    
  try {
    // 1. Find up to 10 of the most recently created profiles
    // We add .sort({ createdAt: -1 }) to get the newest ones first.
    const recentProfiles = await Profile.find({})
      .limit(10);

    // 2. Check if any profiles were found
    if (recentProfiles && recentProfiles.length > 0) {
      // If profiles exist, send them in the response
      console.log(`${recentProfiles.length} profiles found in DB.`);
      res.status(200).json(recentProfiles);
    } else {
      // If the database is empty, send an empty array or a message
      console.log('No profiles found in the database.');
      res.status(200).json([]); // Sending an empty array is standard practice
    }
  } catch (error) {
    console.error('Error fetching initial profiles:', error);
    res.status(500).json({ message: 'Server error while fetching profiles' });
  }
});




router.get("/", async (req, res) => {
    const { id } = req.query;
  try {
    console.log("searching for",{id})
    // 1. Find up to 10 of the most recently created profiles
 
    const profile = await Profile.findOne({_id:id});

    // 2. Check if any profiles were found
    if (profile) {
      // If profiles exist, send them in the response
      console.log(profile.data.user.full_name)
      res.status(200).json(profile);
    } else {
      // If the database is empty, send an empty array or a message
      console.log('No profiles with this id found in the database.');
      res.status(200).json([]); // Sending an empty array is standard practice
    }
  } catch (error) {
    console.error('Error fetching initial profiles:', error);
    res.status(500).json({ message: 'Server error while fetching profiles' });
  }
});













export default router;
