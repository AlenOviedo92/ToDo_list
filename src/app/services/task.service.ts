import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: ITask[] = [
        { task: 'programar', priority: 'alta', description: 'Programar en Angular', date: '11/11/25', recurring: 'Si' },
        { task: 'rodar', priority: 'media', description: 'Ir hasta Nariño', date: '11/12/25', recurring: 'No' },
        { task: 'leer', priority: 'media', description: 'Leer a Octavio Paz', date: '20/05/25', recurring: 'Si' },
    ];

    private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
    tasks$ = this.tasksSubject.asObservable();
  
    addTask(newTask: ITask) {
        this.tasks.push(newTask);
        this.tasksSubject.next([...this.tasks]); // Emitir el nuevo listado de tareas
    }

    // deleteTask(id: number) {
    //     const updatedTasks = this.tasksSubject.getValue().filter(task => task.id !== id);
    //     this.tasksSubject.next(updatedTasks);
    // }
}
