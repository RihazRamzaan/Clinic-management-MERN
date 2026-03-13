const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Patient name is required"],
        },
        age: {
            type: Number,
            required: [true, "Patient age is required"],
        },
        gender: {
            type: String,
            required: [true, "Patient gender is required"],
            enum: ["Male", "Female", "Other"],
        },
        contact: {
            type: String,
            required: [true, "Patient contact number is required"],
        },
        address: {
            type: String,
            required: [true, "Patient address is required"],
        },
        medicalHistory: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Patient", patientSchema);
