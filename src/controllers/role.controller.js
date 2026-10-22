import { RoleModel } from "../models/role.model.js";

export const createRole = async (req, res) => {
  try {
    const { rolename } = req.body;

      const newRole = await RoleModel.create({
        rolename
    });

    return res.status(201).json({
      msg: "rol creado correctamente",
      data: newRole,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find(); 

    return res.status(200).json({
      msg: "Lista de roles",
      data: roles,
    });
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

//obtener role por id 
export const getRoleById = async (req, res) => {
  try {
    //id desde el param
    const { id } = req.params;

    //const role = await RoleModel.findById(id);

    //mostrar usuarios desde role

    //metodo2, virtual populate, con cambios en el modelo
    //recorrido inverso al populate, sin referenciar directamente en el modelo a las tareas.

    //consultar los usuarios desde role
    const role = await RoleModel.findById(id)
      .populate("users"); //usa la relacion virtual

    if (!role) {
      return res.status(404).json({
        msg: "Rol no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Rol encontrado",
      data: {
        role,
      },
    });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
