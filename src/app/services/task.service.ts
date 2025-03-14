import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
        this.getTask();
    }

    getTask(): void {
        this.http.get<ITask[]>(this.apiUrl).subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.tasksSubject.next([...this.tasks]);                                  
            },
            error: (error) => console.error('Error al obtener las tareas:', error)
        });
    }
  
    addTask(newTask: ITask): void {
        this.http.post<ITask>(this.apiUrl, newTask).subscribe({
            next: (createdTask) => {
                this.tasks.push(createdTask);
                this.tasksSubject.next([...this.tasks]); 
            },
            error: (error) => console.error('Error al agregar la tarea:', error)
        });
    }

    deleteTask(id: string): void {
        this.http.delete(`${this.apiUrl}/${id}`). subscribe({
            next: () => {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.tasksSubject.next([...this.tasks]);
            },
            error: (error) => console.error('Error al eliminar la tarea:', error)
        });
    }

    toggleTask(id: string): void {
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        const updatedTask = { ...task, completed: !task.completed}                         

        this.http.put<ITask>(`${this.apiUrl}/${id}`, updatedTask).subscribe({
            next: (responseTask) => {
                this.tasks = this.tasks.map(task => task.id === id ? responseTask : task);
                this.tasksSubject.next([...this.tasks]);
            },
            error: (error) => console.error('Error al actualizar la tarea:', error)
        })
    }

    updateTask(id: string, updatedTask: ITask): void {
        this.http.put<ITask>(`${this.apiUrl}/update/${id}`, updatedTask).subscribe({
            next: (responseTask) => {
                this.tasks = this.tasks.map(task => task.id === id ? responseTask : task);
                this.tasksSubject.next([...this.tasks]);
            },
            error: (error) => console.error('Error al actualizar la tarea: ', error)
        });
    }

    getTaskById(id: string): Observable<ITask | undefined> {
        return this.http.get<ITask>(`${this.apiUrl}/${id}`).pipe(
            map(task => task || undefined)
        );
    }
} 
