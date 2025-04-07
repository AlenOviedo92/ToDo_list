import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/tasks';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    public tasks: ITask[] = [];
    private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
    private deletedTasksSubject = new BehaviorSubject<ITask[]>([]);
    // private apiUrl = 'http://localhost:3001/tasks';
    private apiUrl = `${environment.apiUrl}/tasks`;                
    tasks$ = this.tasksSubject.asObservable();
    deletedTasks$ = this.deletedTasksSubject.asObservable();

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

    getDeletedTasks(): void {
        this.http.get<ITask[]>(`${this.apiUrl}/deleted`).subscribe({
            next: (deletedTasks) => {
                this.deletedTasksSubject.next(deletedTasks);                                 
            },
            error: (error) => console.error('Error al obtener las tareas eliminadas:', error)
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

    restoreTask(id: string): void {
        this.http.put<ITask>(`${this.apiUrl}/restore/${id}`, {}).subscribe({
            next: (restoredTask) => {
                // Opcional: lo agregas de nuevo a `tasks` si quieres que aparezca de inmediato en la lista activa
                this.tasks.push(restoredTask);
                this.tasksSubject.next([...this.tasks]);
    
                // Opcional: remueves la tarea restaurada del listado de eliminadas
                const updatedDeletedTasks = this.deletedTasksSubject.getValue().filter(task => task.id !== id);
                this.deletedTasksSubject.next(updatedDeletedTasks);
            },
            error: (error) => console.error('Error al restaurar la tarea:', error)
        });
    }    
} 
