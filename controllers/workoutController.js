const Workout = require("../models/workoutModel.js");

const getWorkouts = async (req, res) => {
  //res.json({ mssg: "GET all workouts" });
  try {
    const workout = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkout = async (req, res) => {
  //res.json({ mssg: "GET all workouts" });
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No suck to delete workout" });
  }
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(400).json({ error: "No suck to update workout" });
  }
  res.status(200).json(workout);
};

module.exports = { getWorkouts, getWorkout, deleteWorkout, updateWorkout };
