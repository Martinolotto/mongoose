/**
 * Seeder LOCAL para practicar referencias con Mongoose.
 * Ejecutar desde la RAIZ del proyecto:
 *   node src/seeders/seed.js --reset
 *
 * AVISO: --reset elimina TODA la base de datos local "mongoose".
 * No se ejecuta al iniciar Express.
 */
import mongoose from "mongoose";
import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";

const DB_URI = "mongodb://127.0.0.1:27017/mongoose";

async function seed() {
  // 1. Protección: sin --reset, no borramos ni creamos nada.
  if (!process.argv.includes("--reset")) {
    throw new Error("Falta --reset. Ejecutá: node src/seeders/seed.js --reset");
  }

  // 2. Conectamos a la MISMA base que usa tu database.js.
  await mongoose.connect(DB_URI);

  // 3. Confirmamos que la conexión apunte a la base local de prácticas.
  if (
    mongoose.connection.name !== "mongoose" ||
    !["127.0.0.1", "localhost"].includes(mongoose.connection.host)
  ) {
    throw new Error("Se canceló el reinicio: la conexión no apunta a la BD local 'mongoose'.");
  }

  // 4. Borramos los documentos y colecciones de esta BD de PRUEBAS.
  //    Nunca poner dropDatabase() en startDB() ni en app.js.
  await mongoose.connection.dropDatabase();
  console.log("Base local 'mongoose' reiniciada.");

  // 5. PRIMERO creamos los roles: MongoDB les asigna sus _id.
  const [admin, developer, viewer] = await RoleModel.create([
    { rolename: "admin" },
    { rolename: "developer" },
    { rolename: "viewer" },
  ]);

  // 6. DESPUÉS creamos usuarios, referenciando los _id reales de Role.
  //    addresses son subdocumentos embebidos: no necesitan otra colección.
  const [ana, bruno, carla] = await UserModel.create([
    {
      username: "ana_seed",
      email: "ana.seed@example.test",
      password: "DemoLocal123!", // Solo ejemplos locales: tu modelo aún guarda texto plano.
      addresses: [{ street: "Calle 100", city: "Formosa", country: "Argentina" }],
      roles: [admin._id, developer._id], // Ana tiene DOS roles.
    },
    {
      username: "bruno_seed",
      email: "bruno.seed@example.test",
      password: "DemoLocal123!",
      addresses: [{ street: "Calle 200", city: "Formosa", country: "Argentina" }],
      roles: [developer._id], // Comparte el rol developer con Ana.
    },
    {
      username: "carla_seed",
      email: "carla.seed@example.test",
      password: "DemoLocal123!",
      addresses: [{ street: "Calle 300", city: "Formosa", country: "Argentina" }],
      roles: [viewer._id, developer._id],
    },
  ]);

  // 7. FINALMENTE creamos tareas, referenciando el _id real de cada User.
  //    Task.author => User._id: un usuario puede ser autor de varias tareas.
  const tasks = await TaskModel.create([
    { title: "Preparar API REST", description: "Repasar rutas y controladores", author: ana._id },
    { title: "Practicar populate", description: "Consultar tareas desde usuarios", author: ana._id },
    { title: "Probar Bruno", description: "Ejecutar peticiones de prueba", author: bruno._id },
    { title: "Revisar schemas", description: "Validar tipos de datos y referencias", author: bruno._id },
    { title: "Estudiar virtuales", description: "Consultar usuarios desde roles", author: carla._id },
  ]);

  // 8. Mostramos los IDs generados, para copiar las rutas en Bruno.
  console.log("\nROLES (id y nombre):");
  console.table([admin, developer, viewer].map((r) => ({
    id: String(r._id), rolename: r.rolename,
  })));

  console.log("\nUSUARIOS (id y nombre):");
  console.table([ana, bruno, carla].map((u) => ({
    id: String(u._id), username: u.username,
  })));

  console.log(`\nTareas creadas: ${tasks.length}`);
  console.log("\nProbá estas rutas en Bruno (ajustá el puerto si hace falta):");
  console.log(`GET http://localhost:3000/api/users/${ana._id}`);
  console.log(`GET http://localhost:3000/api/role/${developer._id}`);
}

try {
  await seed();
  console.log("\nSeeder finalizado correctamente.");
} catch (error) {
  console.error("\nError ejecutando el seeder:", error.message);
  process.exitCode = 1;
} finally {
  // 9. Cerramos la conexión: el proceso termina sin dejar sesiones abiertas.
  await mongoose.disconnect();
}
