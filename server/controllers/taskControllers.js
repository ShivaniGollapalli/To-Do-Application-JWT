import tasksModel from "../models/tasksModel.js";
import mongoose from "mongoose";

/*******************************
 * CREATE TASK
 *******************************/
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.json({
        status: false,
        message: "Task title is required",
      });
    }

    const newTask = {
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "pending",
      createdAt: Date.now(),
      userId: new mongoose.Types.ObjectId(req.userId),
    };

    const createdTask = await tasksModel.create(newTask);

    return res.status(200).json({
      status: true,
      message: "Task created successfully",
      task: createdTask,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

/*******************************
 * GET ALL TASKS OF USER
 *******************************/
export const getTasks = async (req, res) => {
  try {
    const tasks = await tasksModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.json({
      status: true,
      tasks,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

/*******************************
 * GET SINGLE TASK BY ID (User Scoped)
 *******************************/
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await tasksModel.findOne({
      _id: taskId,
      userId: req.userId,
    });

    if (!task) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }

    return res.json({
      status: true,
      task,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

/*******************************
 * UPDATE TASK
 *******************************/
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.json({
        status: false,
        message: "Task title cannot be empty",
      });
    }

    const updates = {
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "pending",
      updatedAt: Date.now(),
    };

    const updatedTask = await tasksModel.findOneAndUpdate(
      { _id: taskId, userId: req.userId },
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }

    return res.json({
      status: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

/*******************************
 * DELETE TASK
 *******************************/
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await tasksModel.findOneAndDelete({
      _id: taskId,
      userId: req.userId,
    });

    if (!deletedTask) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }

    return res.json({
      status: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};
