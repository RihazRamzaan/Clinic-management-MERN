const Patient = require("../models/Patient");
const asyncHandler = require("express-async-handler");

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    res.status(200).json(patients);
});

// @desc    Get a single patient
// @route   GET /api/patients/:id
// @access  Public
const getPatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(404);
        throw new Error("Patient not found");
    }
});

// @desc    Create a patient
// @route   POST /api/patients
// @access  Public
const createPatient = asyncHandler(async (req, res) => {
    const { name, age, gender, contact, address, medicalHistory } = req.body;

    if (!name || !age || !gender || !contact || !address) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    const patient = await Patient.create({
        name,
        age,
        gender,
        contact,
        address,
        medicalHistory,
    });

    res.status(201).json(patient);
});

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Public
const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
        patient.name = req.body.name || patient.name;
        patient.age = req.body.age || patient.age;
        patient.gender = req.body.gender || patient.gender;
        patient.contact = req.body.contact || patient.contact;
        patient.address = req.body.address || patient.address;
        patient.medicalHistory = req.body.medicalHistory !== undefined ? req.body.medicalHistory : patient.medicalHistory;

        const updatedPatient = await patient.save();
        res.status(200).json(updatedPatient);
    } else {
        res.status(404);
        throw new Error("Patient not found");
    }
});

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Public
const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
        await patient.deleteOne();
        res.status(200).json({ message: "Patient removed" });
    } else {
        res.status(404);
        throw new Error("Patient not found");
    }
});

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
};
