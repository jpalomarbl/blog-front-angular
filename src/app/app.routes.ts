import { Routes } from '@angular/router';
import { MessageListComponent } from './Components/message-list/message-list.component';
import { MessageFormComponent } from './Components/message-form/message-form.component';

export const routes: Routes = [
    {
        path: '',
        component: MessageListComponent
    },
    {
        path: 'message/:id',
        component: MessageFormComponent
    }
];
