import { Routes } from '@angular/router';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [
    {
        path: 'tasks',
        component: ListTaskComponent
    },
    {
        path: 'create',
        component: AddTaskComponent
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
];
