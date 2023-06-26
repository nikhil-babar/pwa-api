const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String },
  skills: [{ type: String }],
  duration: { type: Number },
  stipend: [{ type: Number }],
  applicants: { type: Number },
  expiry: { type: Number },
  posted: { type: Number },
  open_positions: { type: Number },
  location: { type: String },
  experience: { type: String },
  about: { type: String },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  type: { type: String},
  category: [{ type: String }],
  timing: { type: String },
  isBookmarked: { type: Boolean }
});

const Internship = mongoose.model("internship", internshipSchema);

module.exports = Internship;
