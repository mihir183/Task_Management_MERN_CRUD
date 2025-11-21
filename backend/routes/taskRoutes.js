import express from "express";
import Task from "../models/task.js";

const router = express.Router();

// CREATE
router.post("/add", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// READ
router.get("/get", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
router.put("/update:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
router.delete("/delete:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task Deleted" });
});

export default router;
