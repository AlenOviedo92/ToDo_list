import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPriority } from '../models/priority';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PriorityService {
    private priorities: IPriority[] = [];
    private prioritiesSubject = new BehaviorSubject<IPriority[]>(this.priorities);
    // private apiUrl = 'http://localhost:3001/priorities';
    private apiUrl = `${environment.apiUrl}/priorities`;
    priorities$ = this.prioritiesSubject.asObservable();

    constructor(private http: HttpClient) { }

    getPriority(): void {    
        this.http.get<IPriority[]>(this.apiUrl).subscribe({
            next: (priorities) => {
                this.priorities = priorities;
                this.prioritiesSubject.next([...this.priorities]);
            },
            error: (error) => console.error('Error al obtener las tareas:', error)
        });
    }
} 
