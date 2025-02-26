import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StatusTaskDirective } from '../../directives/status-task.directive';

@Component({
    selector: 'app-list-task',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        StatusTaskDirective
    ],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {
    displayedColumns: string[] = ['completed', 'position', 'task', 'priority', 'description', 'date', 'recurring', 'actions'];
    dataSource$: Observable<ITask[]>;

    constructor(private taskService: TaskService) {
        this.dataSource$ = this.taskService.tasks$; // Vincularse al observable del servicio
    }

    deleteTask(index: number) {
        this.taskService.deleteTask(index);
    }

    toggleTask(index: number) {
        this.taskService.toggleTask(index);
    }
}
