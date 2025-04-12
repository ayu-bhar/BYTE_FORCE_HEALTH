import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    Name : String , 
    UserName : String,
    DateOfBirth : String,
    Email : String,
    Password : String,
    City : String,
    Country : String,
    Postalcode : Number,
    Bloodgroup : String,
    Weight : Number,
    Height : Number,
});
export const Profile = mongoose.model("Profile", profileSchema);