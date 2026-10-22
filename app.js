import "dotenv/config";

import express from "express";
import { startDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";


//routers
import {userRouter} from './src/routes/user.routes.js';
import { taskRouter } from "./src/routes/task.routes.js";
import { roleRouter } from './src/routes/role.routes.js';


const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());

// para que entienda el formato json
app.use(express.json());

app.use(cookieParser());

//ruta de prueba del servidor
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "servidor prendido",
  });
});

//rutas
app.use("/api", userRouter)
app.use("/api", taskRouter);
app.use("/api", roleRouter);


const startServer = async () => {
  try {
    await startDB();

    app.listen(PORT, async () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log("No se pudo inciar el servidor");
  }
};

startServer();
