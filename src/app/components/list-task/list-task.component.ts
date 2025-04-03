import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { StatusTaskDirective } from '../../directives/status-task.directive';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

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
        MatSelectModule,
        MatPaginatorModule,
        MatCardModule
    ],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['completed', 'position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource = new MatTableDataSource<ITask>([]);
    filterValue: string = 'all';
    originalTasks: ITask[] = [];                                

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.taskService.getTask();
        this.taskService.tasks$.subscribe(tasks => {
            this.originalTasks = tasks ?? [];
            this.applyFilter();
            this.dataSource.paginator = this.paginator;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private router: Router,
    ) {}

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

    deletedTasks(): void {
        this.router.navigate(['/deleted']);
    }

    openUpdateTask(id: string): void {
        this.router.navigate([`/update/${id}`]);
    }

    applyFilter(): void {
        let filteredTasks = [...this.originalTasks];

        if (this.filterValue === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (this.filterValue === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }
        this.dataSource.data = filteredTasks;
    }
} 
