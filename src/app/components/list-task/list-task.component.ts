import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StatusTaskDirective } from '../../directives/status-task.directive';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
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
    ],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit {
    displayedColumns: string[] = ['completed', 'position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource$: Observable<ITask[]>;

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private router: Router,
    ) {
        this.dataSource$ = this.taskService.tasks$; // Vincularse al observable del servicio
    }

    deleteTask(index: string): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '300px',
            data: { message: '¿Estás seguro que deseas eliminar esta tarea?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.taskService.deleteTask(index);
            }
        });
    }

    updateTask(id: string): void {
        console.log('Editar tarea con id: ', id);
    }

    toggleTask(id: string) {
        this.taskService.toggleTask(id);
    }

    openForm(): void {
        this.router.navigate(['/create']);
    }

    ngOnInit(): void {
        this.taskService.getTask();
    }
}
