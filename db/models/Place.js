import mongoose from "mongoose";

const { Schema } = mongoose;

// define the five fields of the document
// Schema is a blueprint of the database which specifies what fields will be present and what would be their types
const placeSchema = new Schema({
  name: { type: String, uppercase: true, required: true }, // you have to enter a value
  location: { type: String, uppercase: true}, // converts the input to uppercase 
  image: String,
  mapURL: String,
  description: String,
});


const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
