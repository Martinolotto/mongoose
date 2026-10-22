import { TaskModel } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      author,
    });

    return res.status(201).json({
      msg: "Tarea creada correctamente",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate("author", "username -_id"); //populate como el include,;

    // otra forma:
    // const tasks = await TaskModel.find().populate({
    //   path: "author",
    //   select: "username -_id",
    // });

    return res.status(200).json({
      msg: "Lista de Tareas",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

//task por id
export const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;

    //obtenemos author con el id del usuario jutno con la tarea, gracias a la referencia.
    // const task = await TaskModel.findById(id);

    //con populate buscamos el documento correspondiente y se agrega al resultado
    const task = await TaskModel.findById(id)
      .populate("author"); //gracias a la ref en el modelo


    if (!task) {
      return res.status(404).json({
        msg: "tarea no encontrada"
      })
    }

    return res.status(200).json({
      msg: "Tarea Encontrada",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};