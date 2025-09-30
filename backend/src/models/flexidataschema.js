import mongoose from "mongoose";

const  flexidataschema = new mongoose.Schema({}, { strict: false })
const Profile = mongoose.model("FlexibleProfile", flexidataschema);

export default Profile;