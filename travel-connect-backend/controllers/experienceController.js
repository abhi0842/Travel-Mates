let experiences = [] // temporary in-memory store

// GET all experiences
export const getExperiences = (req, res) => {
  res.json(experiences)
}

// POST new experience
export const createExperience = (req, res) => {
  const { userName, destination, locationName, country, content } = req.body

  if (!userName || !destination || !locationName || !country || !content) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const newExperience = {
    id: experiences.length + 1,
    userName,
    destination,
    locationName,
    country,
    content,
  }

  experiences.push(newExperience)
  res.status(201).json(newExperience)
}
