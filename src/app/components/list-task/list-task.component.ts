import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StatusTaskDirective } from '../../directives/status-task.directive';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-task',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        StatusTaskDirective,
        MatDialogModule,
        ModalComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit {
    displayedColumns: string[] = ['completed', 'position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource$: Observable<ITask[]>;
    filteredTasks$: Observable<ITask[]>;            // Lista filtrada
    filterValue: string = 'all';                    // Estado del filtro

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private router: Router,
    ) {
        this.dataSource$ = this.taskService.tasks$; // Me vinculo al observable del servicio
        this.filteredTasks$ = this.dataSource$;     // Inicialmente muestro todas las tareas
    }

    deleteTask(index: string): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '300px',
            data: { message: '¿Estás seguro que deseas eliminar esta tarea?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.taskService.deleteTask(index);
                this.applyFilter();
            }
        });
    }

    toggleTask(id: string) {
        this.taskService.toggleTask(id);
        this.applyFilter();
    }

    openForm(): void {
        this.router.navigate(['/create']);
    }

    openUpdateTask(id: string): void {
        this.router.navigate([`/update/${id}`]);
    }

    applyFilter(): void {
        this.filteredTasks$ = this.dataSource$.pipe(
            map(tasks => {
                if (this.filterValue === 'completed') {
                    return tasks.filter(task => task.completed);
                } else if (this.filterValue === 'pending') {
                    return tasks.filter(task => !task.completed);
                }
                return tasks;                           // Si es "all", muestra todas las tareas
            })
        );
    }

    ngOnInit(): void {
        this.taskService.getTask();
        this.applyFilter();
    }
}
