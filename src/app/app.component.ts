import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { ListTaskComponent } from './components/list-task/list-task.component';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AddTaskComponent, ListTaskComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
    ]
})
export class AppComponent {
    
}
