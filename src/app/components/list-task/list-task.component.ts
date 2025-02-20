import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list-task',
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        MatCheckboxModule
    ],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {
    displayedColumns: string[] = ['position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource$: Observable<ITask[]>;

    constructor(private taskService: TaskService) {
        this.dataSource$ = this.taskService.tasks$; // Vincularse al observable del servicio
    }
}
