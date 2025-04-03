import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ITask } from '../../models/tasks';
import { Router } from '@angular/router';

@Component({
    selector: 'app-deleted-tasks',
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule
    ],
    templateUrl: './deleted-tasks.component.html',
    styleUrl: './deleted-tasks.component.scss'
})
export class DeletedTasksComponent {
    displayedColumns: string[] = ['position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource = new MatTableDataSource<ITask>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    constructor(
        private router: Router,
    ) {}

    listTasks(): void {
        this.router.navigate(['/tasks']);
    }
}
