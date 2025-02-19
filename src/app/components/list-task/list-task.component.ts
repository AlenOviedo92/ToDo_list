import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ITask } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list-task',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {
    displayedColumns: string[] = ['task', 'priority', 'description', 'date', 'recurring'];
    dataSource$: Observable<ITask[]>;

    constructor(private taskService: TaskService) {
        this.dataSource$ = this.taskService.tasks$; // Vincularse al observable del servicio
    }
}
