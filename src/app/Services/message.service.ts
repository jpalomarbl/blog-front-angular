import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDTO } from '../Models/message.dto';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private urlMessageApi: string = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Promise<MessageDTO[]> {
    return this.http
      .get<MessageDTO[]>(this.urlMessageApi)
      .toPromise() as Promise<MessageDTO[]>;
  }

  getMessageById(msgId: number): Promise<MessageDTO> {
    return this.http
      .get<MessageDTO>(this.urlMessageApi + '/' + msgId)
      .toPromise() as Promise<MessageDTO>;
  }

  createMessage(msg: MessageDTO): Promise<MessageDTO> {
    return this.http
      .post<MessageDTO>(this.urlMessageApi, msg)
      .toPromise() as Promise<MessageDTO>;
  }

  updateMessage(msgId: number, msg: MessageDTO): Promise<MessageDTO> {
    return this.http
      .put<MessageDTO>(this.urlMessageApi + '/' + msgId, msg)
      .toPromise() as Promise<MessageDTO>;
  }

  deleteMessage(msgId: number): Promise<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlMessageApi + '/' + msgId)
      .toPromise() as Promise<deleteResponse>;
  }

  errorLog(error: HttpErrorResponse): void {
    console.error('An error occurred:', error.error.msg);
    console.error('Backend returned code:', error.status);
    console.error('Complete message was::', error.message);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
