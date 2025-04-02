import { Routes } from '@angular/router';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DeletedTasksComponent } from './components/deleted-tasks/deleted-tasks.component';

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
        path: 'update/:id',
        component: EditTaskComponent
    },
    {
        path: 'deleted',
        component: DeletedTasksComponent
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
]; 
