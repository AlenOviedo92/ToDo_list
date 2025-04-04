import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TaskService } from '../../services/task.service';
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
export class DeletedTasksComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource = new MatTableDataSource<ITask>([]);
    originalTasks: ITask[] = [];                                

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.taskService.getTask();
        this.taskService.tasks$.subscribe(tasks => {
            this.originalTasks = tasks ?? [];
            this.dataSource.data = this.originalTasks;
            this.dataSource.paginator = this.paginator;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }
    
    constructor(
        private taskService: TaskService,
        private router: Router,
    ) {}

    listTasks(): void {
        this.router.navigate(['/tasks']);
    }
}
