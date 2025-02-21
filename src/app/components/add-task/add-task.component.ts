import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
    minDate: Date = new Date(); // Fecha mínima: hoy

    constructor(private fb: FormBuilder, private taskService: TaskService) {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(20)]],
            dueDate: ['', Validators.required],
            priority: ['', Validators.required],
            description: [''],
            isRecurring: ['']
        });
    }

    addTask(): void {
        if(this.taskForm.invalid) {
            console.log('El formulario no es válido', this.taskForm.value);
            return;
        }

        console.log('Datos del formulario: ', this.taskForm.value);
        const formData = this.taskForm.value;
        console.log(formData);
        console.log(this.taskForm.valid);
        const newTask = {
            task: formData.title,
            priority: formData.priority,
            description: formData.description,
            date: formData.dueDate,
            recurring: formData.isRecurring ? 'Si' : 'No',
            completed: false
        };

        this.taskService.addTask(newTask);
        this.taskForm.reset(); // Limpiar formulario después de agregar la tarea
    }
}
