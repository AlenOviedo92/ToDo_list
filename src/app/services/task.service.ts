import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: ITask[] = [
        { task: 'programar', priority: 'alta', description: 'Programar en Angular', date: '11/11/25', recurring: 'Si', completed: false },
        { task: 'rodar', priority: 'media', description: 'Ir hasta Nariño', date: '11/12/25', recurring: 'No', completed: false },
        { task: 'leer', priority: 'media', description: 'Leer a Octavio Paz', date: '20/05/25', recurring: 'Si', completed: false },
    ];

    private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
    tasks$ = this.tasksSubject.asObservable();
  
    addTask(newTask: ITask) {
        this.tasks.push(newTask);
        this.tasksSubject.next([...this.tasks]); // Emitir el nuevo listado de tareas
    }

    deleteTask(index: number) {
        this.tasks.splice(index, 1);
        this.tasksSubject.next([...this.tasks]);
        console.log(this.tasks$);
    }

    toggleTask(index: number) {
        this.tasks[index].completed = !this.tasks[index].completed; // Cambiar estado
        this.tasksSubject.next([...this.tasks]); // Emitir el nuevo listado
    }
}
