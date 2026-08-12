import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇



interface Tarea{
  id:number;
  titulo: string;
  completada: boolean;
}
let tareas : Tarea[] = [];
let contId:number = 1;

let sw=0;

const añadirTarea = (tit: string) => {
        tareas.push({id:contId++,titulo:tit,completada: false});
}

const listarTareas = () => {
    for (let tarea of tareas) {
        const estado = tarea.completada ? "completada" : "pendiente";
        console.log(`[${tarea.id}] ${tarea.titulo} - ${estado}`);
    }
};
const eliminarTarea = (id: number) => {
    const i = tareas.findIndex(tarea => tarea.id === id);
    if (i !== -1) {
        const eliminar = tareas.splice(i, 1)[0];
        console.log(`Tarea eliminada: ${eliminar.titulo}`);
    } else {
        console.log("Tarea no encontrada");
    }
};

while (sw !=4) {
  const answer = await rl.question (`Elija la tarea a realizar:
    1. Agregar tarea
    2. Eliminar tarea
    3. Listar tareas
    4. Salir
    tu respuesta:  `);
    sw = parseInt(answer);
    
  switch (sw) {
    case 1:
      añadirTarea(await rl.question("Ingrese la tarea a agregar: "));
      break
    case 2:
      eliminarTarea(parseInt(await rl.question("ID de la tarea a eliminar: ")));
      break;
    case 3:
      listarTareas();
    case 4:
      break;
  }
}


// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();

