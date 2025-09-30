import express from "express"
import { readFile } from 'node:fs/promises';
import { PythonShell } from 'python-shell';
import path, { dirname } from "path";
import Profile from '../models/flexidataschema.js';

const router = express.Router();
const __dirname = path.resolve();


async function readMyFile(username) {
  try {
    const filePath = path.join(__dirname, `\DATA\\${username}.json`);// Construct the full path
    const data = await readFile(filePath, 'utf8');      // Read the file as a string
    const jsonData = JSON.parse(data);                   // Parse the string into a JavaScript object
    return jsonData;
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    return false;
  }
}

async function generateProfileWithPython(username) {
  const envpath = process.env.ENV_PATH || "C:\Users\rajgu\miniconda3\envs\cubebuddy\python.exe";

  const options = {
    mode: 'text',
    pythonPath: envpath,
    scriptPath: path.join(__dirname, '/src/Pythonscript/'),
    // Pass the identifier as a command-line argument to the Python script
    args: [username]
  };

  try {
    const results = await PythonShell.run('initialscrapescript.py', options);
    // Important: python-shell returns an array of JSON objects.
    // If your script prints one JSON object, it will be the first element.
    return results[0];
  } catch (err) {
    console.error("Python script error:", err);
    throw new Error("Failed to generate Profile from Python script.");
  }
}



router.get("/", async (req, res) => {
  console.log("hit");
  const { username } = req.query; // e.g., { identifier: "john.doe@example.com" }
  console.log(username)
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // 1. Check if the Profile exists in MongoDB
    let profile = await Profile.findOne({ identifier: username });

    if (profile) {
      // 2a. If Profile exists, return it
      console.log('Profile found in DB.');
      return res.status(200).json(profile);
    } else {
      // 2b. If not, generate it with Python
      console.log('Profile not found. searhcingweb with Python...');
      let newProfileData = await generateProfileWithPython(username);
      try {
        newProfileData = await readMyFile(username)
        if (newProfileData) {
          // 3. Store the new Profile in MongoDB
          profile = new Profile({
            identifier: username,
            ...newProfileData // Spread the data returned from Python
          });
          await profile.save();
          console.log('New Profile saved to DB.');
        }
        
      }
      catch (error) {
        console.error('FILE NOT FOUND', error);
        res.status(500).json({ message: 'PROFILE NOT FOUND OR INCORRECT USERNAME' });



      }


      // 4. Return the newly created Profile
      // Use status 201 to indicate a resource was created
      return res.status(201).json(profile);
    }
  } catch (error) {
    console.error('Error processing Profile:', error);
    res.status(500).json({ message: 'Server error' });
  }



});






export default router;
