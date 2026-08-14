import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}
let tareas: Tarea[] = [];
let contId: number = 1;

let sw = 0;

// const añadirTarea = (tit: string) => {
//   tareas.push({ id: contId++, titulo: tit, completada: false });
// };

const añadirTarea = async (tit: string): Promise<void> => {
  try {
    if (tit.trim() === "") {
      throw new Error("No puedes añadir una tarea vacia");
    }
    await saveToDB();
    tareas.push({ id: contId++, titulo: tit, completada: false });
    console.log(`Tarea: ${tit} agregada correctamente`);
  } catch (error) {
    console.log((error as Error).message);
  }
};

const listarTareas = () => {
  for (let tarea of tareas) {
    const estado = tarea.completada ? "completada" : "pendiente";
    console.log(`[${tarea.id}] ${tarea.titulo} - ${estado}`);
  }
};

const listarTareasMetodo = (): void => {
  const tareasFormateadas = tareas.map((tarea) => {
    const { id, titulo, completada } = tarea;

    return `[ID: ${id}] - ${titulo} - ${completada ? "completada" : "pendiente"}`;
  });

  tareasFormateadas.forEach((tarea) => {
    console.log(tarea);
  });
};

const imprimir = (lista: Tarea[]) => {
  const tareasFormateadas = lista.map((tarea) => {
    const { id, titulo, completada } = tarea;

    return `[ID: ${id}] - ${titulo} - ${completada ? "completada" : "pendiente"}`;
  });

  tareasFormateadas.forEach((tarea) => {
    console.log(tarea);
  });
};

const eliminarTarea = (id: number) => {
  const i = tareas.findIndex((tarea) => tarea.id === id);
  if (i !== -1) {
    const eliminar = tareas.splice(i, 1)[0];
    console.log(`Tarea eliminada: ${eliminar.titulo}`);
  } else {
    console.log("Tarea no encontrada");
  }
};

const marcarTarea = (id: number): void => {
  const laTarea = tareas.find((tarea) => tarea.id === id);

  if (laTarea) {
    laTarea.completada = true;
    console.log(`Tarea "${laTarea.titulo}" completada`);
  } else {
    console.log("Tarea no encontrada");
  }
};

const filtrarPendiente = (): Tarea[] => {
  return tareas.filter((tarea) => tarea.completada === false);
};

const filtrarCompletada = (): Tarea[] => {
  return tareas.filter((tarea) => tarea.completada);
};

const saveToDB = (): Promise<void> => {
  return new Promise((guardado) => {
    setTimeout(() => {
      console.log("Guardado en DB satisfactorio");
      guardado();
    }, 2000);
  });
};

while (sw != 7) {
  const answer = await rl.question(`Elija la tarea a realizar:
    1. Agregar tarea
    2. Eliminar tarea
    3. Listar tareas
    4. Marcar tarea completada
    5. Filtrar tareas pendientes
    6. Filtrar tareas completadas
    7. Salir
    tu respuesta:  `);
  sw = parseInt(answer);

  switch (sw) {
    case 1:
      await añadirTarea(await rl.question("Ingrese la tarea a agregar: "));
      break;
    case 2:
      eliminarTarea(parseInt(await rl.question("ID de la tarea a eliminar: ")));
      break;
    case 3:
      listarTareasMetodo();
      break;
    case 4:
      marcarTarea(parseInt(await rl.question("ID de la tarea completada: ")));
      break;
    case 5:
      imprimir(filtrarPendiente());
      break;
    case 6:
      imprimir(filtrarCompletada());
      break;
    case 7:
      console.log("ADIOS!");
      break;
  }
}

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();
