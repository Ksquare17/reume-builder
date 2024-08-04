const mongoose = require('mongoose');

// Define schema for Profile
const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    aboutMe: String,
    address: String,
    linkedIn: String,
    github: String,
    personalPortfolio: String,
    leetcode: String,
    codeforces: String
});

// Define schema for Education
const educationSchema = new mongoose.Schema({
    institute: String,
    fos: String,
    degree: String,
    startYear: String,
    endYear: String,
    grade: String,
   
});

// Define schema for Project
const certificateSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    techStack: String
});

// Define schema for Experience
const experienceSchema = new mongoose.Schema({
    role: String,
    institute: String,
    start_date: String,
    end_date: String,
    desc: String
});

// Define schema for ExtraDetails
const skillSchema = new mongoose.Schema({
    skill: String,
    proficiency: Number
});

// Define main schema for user resume
const resumeSchema = new mongoose.Schema({
    profile: profileSchema,
    education: [educationSchema],
    certificates: [certificateSchema],
    experience: [experienceSchema],
    skills: [skillSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create and export the model
const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;