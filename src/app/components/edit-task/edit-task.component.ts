import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { PriorityService } from '../../services/priority.service';
import { IPriority } from '../../models/priority';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../models/tasks';

@Component({
  	selector: 'app-edit-task',
  	standalone: true,
  	imports: [
    	CommonModule,
    	MatFormFieldModule, 
    	MatInputModule, 
    	MatDatepickerModule, 
    	MatSelectModule, 
    	MatCheckboxModule, 
    	MatButtonModule,
    	ReactiveFormsModule
  	],
  	templateUrl: './edit-task.component.html',
  	styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
	taskForm: FormGroup;
    minDate: Date = new Date();
    dataSource$: Observable<IPriority[]>;
	taskId!: string;

	constructor(
		private fb: FormBuilder, 
        private taskService: TaskService,
        private priorityService: PriorityService,
        private router: Router,
		private route: ActivatedRoute,
	) {
		this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(20)]],
            dueDate: ['', Validators.required],
            priority: ['', Validators.required],
            description: [''],
            isRecurring: ['']
        });

        this.dataSource$ = this.priorityService.priorities$;
	}

    updateTask(): void {
		if (this.taskForm.invalid) return;
		// const task = this.tasks.find(task => task.id === id);
		const task = this.taskService.tasks.find(task => task.id === this.taskId);

		const updatedTask: ITask = {
			id: this.taskId,
			task: this.taskForm.value.title,
			date: this.taskForm.value.dueDate,
			priorityId: this.taskForm.value.priority,
			description: this.taskForm.value.description,
			recurring: this.taskForm.value.isRecurring ? 'Si' : 'No',
			completed: task?.completed,
		};
		this.taskService.updateTask(this.taskId, updatedTask);
		this.router.navigate(['/']);
    }

	ngOnInit(): void {
        this.priorityService.getPriority();

		this.taskId = this.route.snapshot.paramMap.get('id') || '';

		if(this.taskId) {
			this.taskService.getTaskById(this.taskId).subscribe(task => {
				if(task) {
					this.priorityService.priorities$.subscribe(priorities => {
						const matchingPriority = priorities.find(p => p.id === task.priorityId);

						this.taskForm.patchValue({
							title: task.task,
							dueDate: task.date ? new Date(task.date) : '',
							priority: matchingPriority ? matchingPriority.id : '',
							description: task.description,
							isRecurring: task.recurring === 'Si'
						});		
					});	 
				}
			});
		}
    }
}
