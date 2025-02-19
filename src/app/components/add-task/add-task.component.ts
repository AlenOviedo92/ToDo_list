import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-add-task',
    standalone: true,
    imports: [
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
export class AddTaskComponent {
    taskForm: FormGroup;

    constructor(private fb: FormBuilder, private taskService: TaskService) {
        this.taskForm = this.fb.group({
            title: [''],
            dueDate: [''],
            priority: [''],
            description: [''],
            isRecurring: [false]
        });
    }

    addTask(): void {
        console.log('Datos del formulario: ', this.taskForm.value);
        if(this.taskForm.valid) {
            const formData = this.taskForm.value;
            const newTask = {
                task: formData.title,
                priority: formData.priority,
                description: formData.description,
                date: formData.dueDate,
                recurring: formData.isRecurring,
            };

            this.taskService.addTask(newTask);
            this.taskForm.reset(); // Limpiar formulario después de agregar la tarea
        }
    }
}
