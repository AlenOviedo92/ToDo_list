import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TaskService } from '../../services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { ITask } from '../../models/tasks';
import { Router } from '@angular/router';

@Component({
    selector: 'app-deleted-tasks',
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './deleted-tasks.component.html',
    styleUrl: './deleted-tasks.component.scss'
})
export class DeletedTasksComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSourceDeleted = new MatTableDataSource<ITask>([]);
    originalTasks: ITask[] = [];                                

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.taskService.getDeletedTasks();
        this.taskService.deletedTasks$.subscribe(deletedTasks => {
            this.originalTasks = deletedTasks ?? [];
            this.dataSourceDeleted.data = this.originalTasks;
            this.dataSourceDeleted.paginator = this.paginator;
        });
    }

    ngAfterViewInit(): void {
        this.dataSourceDeleted.paginator = this.paginator;
    }
    
    constructor(
        private taskService: TaskService,
        private router: Router,
    ) {}

    listTasks(): void {
        this.router.navigate(['/tasks']);
    }

    restoreTask(id: string): void {
        this.taskService.restoreTask(id);
    }
}
