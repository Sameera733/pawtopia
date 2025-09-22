








import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

const donateFile = "database/donater.json";
const volunteerFile = "database/volunteer.json";

app.use(cors());
app.use(bodyParser.json());

// ----------------- DONATION ROUTES -----------------

// Add a new donation
app.post("/api/donate", (req, res) => {
  const { name, email, amount } = req.body;

  if (!name || !email || !amount) {
    return res.status(400).json({ message: "Invalid data" });
  }

  fs.readFile(donateFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let donors = [];
    try {
      donors = JSON.parse(data);
    } catch (e) {
      donors = [];
    }

    const newDonor = {
      id: donors.length + 1,
      name,
      email,
      amount,
      date: new Date().toISOString(),
    };

    donors.push(newDonor);

    fs.writeFile(donateFile, JSON.stringify(donors, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving file" });

      res.status(201).json({ message: "Donation added successfully", donor: newDonor });
    });
  });
});

// Get donation list
app.get("/api/donors", (req, res) => {
  fs.readFile(donateFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let donors = [];
    try {
      donors = JSON.parse(data);
    } catch (e) {
      donors = [];
    }

    res.json(donors);
  });
});

// ----------------- VOLUNTEER ROUTES -----------------

// Add a new volunteer
app.post("/api/volunteer", (req, res) => {
  const { name, email, phone, availability, why } = req.body;

  if (!name || !email || !phone || !availability) {
    return res.status(400).json({ message: "Invalid data" });
  }

  fs.readFile(volunteerFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let volunteers = [];
    try {
      volunteers = JSON.parse(data);
    } catch (e) {
      volunteers = [];
    }

    const newVolunteer = {
      id: volunteers.length + 1,
      name,
      email,
      phone,
      availability,
      why,
      date: new Date().toISOString(),
    };

    volunteers.push(newVolunteer);

    fs.writeFile(volunteerFile, JSON.stringify(volunteers, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving file" });

      res.status(201).json({ message: "Volunteer added successfully", volunteer: newVolunteer });
    });
  });
});


// ----------------- START SERVER -----------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
