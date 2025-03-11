import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: ITask[] = [];
    private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
    private apiUrl = 'http://localhost:3001/tasks';                   
    tasks$ = this.tasksSubject.asObservable();

    constructor(private http: HttpClient) {
        this.getTask();                                                                    //Una vez instanciado este servicio, la función getTask está disponible
    }

    getTask(): void {
        // this.getFromLocalStorage();                                                     //Obtengo todas las tareas del localStorage
        // this.tasksSubject.next([...this.tasks]);
        // return this.tasks;

        this.http.get<ITask[]>(this.apiUrl).subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.tasksSubject.next([...this.tasks]);                                   // Emitimos los datos actualizados
            },
            error: (error) => console.error('Error al obtener las tareas:', error)
        });
    }
  
    addTask(newTask: ITask): void {
        // this.tasks.push(newTask);
        // this.tasksSubject.next([...this.tasks]);                                        //Emitir el nuevo listado de tareas
        // this.setLocalStorage();                                                         //Actualizo el localStorage cada vez que se agrega una tarea
        this.http.post<ITask>(this.apiUrl, newTask).subscribe({
            next: (createdTask) => {
                this.tasks.push(createdTask);
                this.tasksSubject.next([...this.tasks]); 
            },
            error: (error) => console.error('Error al agregar la tarea:', error)
        });
    }

    deleteTask(id: string): void {
        // this.tasks.splice(id, 1);
        // this.tasksSubject.next([...this.tasks]);
        // console.log(this.tasks$);
        // this.setLocalStorage();                                                         //Actualizo el localStorage cada vez que se elimina una tarea
        this.http.delete(`${this.apiUrl}/${id}`). subscribe({
            next: () => {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.tasksSubject.next([...this.tasks]);
            },
            error: (error) => console.error('Error al eliminar la tarea:', error)
        });
    }

    toggleTask(id: string): void {
        // this.tasks[index].completed = !this.tasks[index].completed;                     //Cambiar estado
        // this.tasksSubject.next([...this.tasks]);                                        //Emitir el nuevo listado
        // console.log(this.tasks$);
        // this.setLocalStorage();                                                         //Actualizo el localStorage cada vez que se cambia la propiedad "completed" de una tarea
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;                                                                 //Si no encuentra la tarea, sale de la fn

        const updatedTask = { ...task, completed: !task.completed}                         //Cambio el estado de completed

        this.http.put<ITask>(`${this.apiUrl}/${id}`, updatedTask).subscribe({
            next: (responseTask) => {
                this.tasks = this.tasks.map(task => task.id === id ? responseTask : task); //Actualizo la tarea en la lista de tareas
                this.tasksSubject.next([...this.tasks]);
            },
            error: (error) => console.error('Error al actualizar la tarea:', error)
        })
    }

    setLocalStorage() {                                                                    //Método que simula la persistencia de datos en LocalStorage                                        
        if(typeof localStorage !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));                     //Guardo en LocalStorage el [] de tareas en formato JSON
        }
    }

    getFromLocalStorage() {                                                                //Método que obtiene las tareas del LocalStorage
        if(typeof localStorage !== 'undefined') {                                          //Valoro la compatibilidad del localStorage
            const savedTask = localStorage.getItem('tasks')                                //Guardo en la variable savedTask las tareas obtenidas desde LocalStorage
            if(savedTask) {                                                                //Si existen tareas guardadas en LocalStorage, guardo dicha info en el array "tasks"
                this.tasks = JSON.parse(savedTask);
            }
        }
    }
}
