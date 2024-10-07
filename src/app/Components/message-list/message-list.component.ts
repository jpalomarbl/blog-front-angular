import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageDTO } from '../../Models/message.dto';
import { MessageService, deleteResponse } from '../../Services/message.service';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages!: MessageDTO[];

  constructor(private messageService: MessageService, private router: Router){
    this.loadMessages();
  };

  private async loadMessages(): Promise<void> {
    try {
      this.messageService.getMessages()
      .then((messageList: MessageDTO[]) => {
        this.messages = messageList;
      });
    } catch (error: any) {
      this.messageService.errorLog(error);
    }
  }

  createMessage(): void {
    this.router.navigateByUrl('/message/create');
  }

  updateMessage(messageId: number): void {
    this.router.navigateByUrl('/message/' + messageId);
  }

  async deleteMessage(messageId: number): Promise<void> {
    let result = confirm('Do you really want to delete the message with ID: ' +  messageId + '?');

    if (result) {
      try {
        this.messageService.deleteMessage(messageId)
        .then((affectedInterface: deleteResponse) => {
          this.loadMessages();
          alert('Deleted message with ID: ' + affectedInterface.affected);
        });
      } catch(error: any) {
        this.messageService.errorLog(error);
      }
    }
  }
}
