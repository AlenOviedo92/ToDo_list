import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: ITask[] = [
        // { task: 'programar', priority: 'alta', description: 'Programar en Angular', date: '11/11/25', recurring: 'Si', completed: false },
        // { task: 'rodar', priority: 'media', description: 'Ir hasta Nariño', date: '11/12/25', recurring: 'No', completed: false },
        // { task: 'leer', priority: 'media', description: 'Leer a Octavio Paz', date: '20/05/25', recurring: 'Si', completed: false },
    ];

    private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
    tasks$ = this.tasksSubject.asObservable();

    constructor() {
        this.getTask();                                               //Una vez instanciado este servicio, la función getTask está disponible
    }

    getTask(): ITask[] {
        this.getFromLocalStorage();                                   //Obtengo todas las tareas del localStorage
        this.tasksSubject.next([...this.tasks]);
        return this.tasks;
    }
  
    addTask(newTask: ITask): void {
        this.tasks.push(newTask);
        this.tasksSubject.next([...this.tasks]);                      //Emitir el nuevo listado de tareas
        this.setLocalStorage();                                       //Actualizo el localStorage cada vez que se agrega una tarea
    }

    deleteTask(index: number): void {
        this.tasks.splice(index, 1);
        this.tasksSubject.next([...this.tasks]);
        console.log(this.tasks$);
        this.setLocalStorage();                                       //Actualizo el localStorage cada vez que se elimina una tarea

    }

    toggleTask(index: number): void {
        this.tasks[index].completed = !this.tasks[index].completed;   //Cambiar estado
        this.tasksSubject.next([...this.tasks]);                      //Emitir el nuevo listado
        console.log(this.tasks$);
        this.setLocalStorage();                                       //Actualizo el localStorage cada vez que se cambia la propiedad "completed" de una tarea

    }

    setLocalStorage() {                                               //Método que simula la persistencia de datos en LocalStorage                                        
        if(typeof localStorage !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));//Guardo en LocalStorage el [] de tareas en formato JSON
        }
    }

    getFromLocalStorage() {                                           //Método que obtiene las tareas del LocalStorage
        if(typeof localStorage !== 'undefined') {                     //Valoro la compatibilidad del localStorage
            const savedTask = localStorage.getItem('tasks')           //Guardo en la variable savedTask las tareas obtenidas desde LocalStorage
            if(savedTask) {                                           //Si existen tareas guardadas en LocalStorage, guardo dicha info en el array "tasks"
                this.tasks = JSON.parse(savedTask);
            }
        }
    }
}
