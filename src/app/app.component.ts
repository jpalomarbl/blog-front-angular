import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MessageFormComponent } from './Components/message-form/message-form.component';
import { MessageListComponent } from './Components/message-list/message-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageFormComponent, MessageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-front-own';
}
