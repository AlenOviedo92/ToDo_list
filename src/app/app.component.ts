import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { ListTaskComponent } from './components/list-task/list-task.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AddTaskComponent, ListTaskComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    
}
