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
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-task',
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
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
    taskForm: FormGroup;
    minDate: Date = new Date();                             // Fecha mínima: hoy
    dataSource$: Observable<IPriority[]>;

    constructor(
        private fb: FormBuilder, 
        private taskService: TaskService,
        private priorityService: PriorityService,
        private router: Router,
    ) {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(20)]],
            dueDate: ['', Validators.required],
            priority: ['', Validators.required],
            description: [''],
            isRecurring: ['']
        });

        this.dataSource$ = this.priorityService.priorities$; // Vincularse al observable del servicio
    }

    addTask(): void {
        if(this.taskForm.invalid) {
            console.log('El formulario no es válido', this.taskForm.value);
            return;
        }

        const formData = this.taskForm.value;

        const newTask = {
            id: crypto.randomUUID(),
            task: formData.title,
            priorityId: formData.priority,
            description: formData.description || '',
            date: formData.dueDate,
            recurring: formData.isRecurring ? 'Si' : 'No',
            completed: false
        };

        this.taskService.addTask(newTask);
        this.taskForm.reset();                               // Limpiar formulario después de agregar la tarea
        this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.priorityService.getPriority();                  // Carga las prioridades al iniciar
    }
}
