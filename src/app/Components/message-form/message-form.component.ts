import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDTO } from '../../Models/message.dto';
import { MessageService } from '../../Services/message.service';


@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  message: MessageDTO = new MessageDTO('', '');
  
  title: FormControl = new FormControl(this.message.title, Validators.required);
  description: FormControl = new FormControl(this.message.description, Validators.required);
  messageForm:FormGroup = new FormGroup({});

  updateFlag: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private fb: FormBuilder) {
    let urlLastParam = '';
    
    this.route.url.subscribe(url => {
      urlLastParam = url[1].path;
    });

    this.messageForm = this.fb.group({
      title: this.title,
      description: this.description
    });

    if (+urlLastParam) {
      this.updateFlag = true;

      this.message.id = +urlLastParam;

      this.prepareUpdateForm();
    }
  }

  checkSendForm(): void {
    const formStatus: boolean = this.messageForm.valid;
    let sendStatus: boolean = false;

    if (!formStatus) {
      this.toastRedirect(formStatus);
    } else {
      this.sendForm()
      .then((result: boolean) => {
        sendStatus = result;
      
        this.toastRedirect(formStatus && sendStatus);
      });
    }

  }

  private async prepareUpdateForm(): Promise<void> {
    try {
      this.messageService.getMessageById(this.message.id)
      .then((message: MessageDTO) => {
        this.title.setValue(message.title);
        this.description.setValue(message.description);
      })
    } catch(error: any) {
      this.messageService.errorLog(error);
    }
  }

  private async toastRedirect(status: boolean): Promise<void> {
    const messageToast = document.getElementById('message-toast');
    const messageToastText = document.querySelector<HTMLElement>('div#message-toast > span');

    messageToast?.classList.remove('no-display');

    if (status) {
      messageToast!.className = 'success';

      if (this.updateFlag) {
        messageToastText!.innerText = 'Congratulations, message updated!';
      } else {
        messageToastText!.innerText = 'Congratulations, message created!';
      }

      await this.messageService.wait(1500);
      this.router.navigateByUrl('');
    } else {
      messageToast!.className = 'failiure';

      if (this.updateFlag) {
        messageToastText!.innerText = 'Unable to update message.';
      } else {
        messageToastText!.innerText = 'Unable to create message.';
      }
    }
  }

  private async sendForm(): Promise<boolean> {
    this.message.title = this.title.value;
    this.message.description = this.description.value;
    
    try {
      if (this.updateFlag) {
        await this.messageService.updateMessage(this.message.id, this.message)
        return true;
      } else {
        await this.messageService.createMessage(this.message)
        return true;
      }
    } catch(error: any) {
      this.messageService.errorLog(error);
      return false;
    }
  }
}
