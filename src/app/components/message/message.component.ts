import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MessagesService } from '../../services/messages.service';
import { AlertMessageService } from '../../services/alert-message.service';


@Component({
  selector: 'app-message',
  imports: [NgFor, NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{
  messages: any[] = [];
  constructor( private messagesService: MessagesService, private alertMessageService: AlertMessageService ) { }

  ngOnInit(): void {
      this.getAllMessages();
  }

  getAllMessages(){
    this.messagesService.getAllMessages().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.messages = res.data.messages;          
        }
      },
      error: (err) => console.error('getAllMessages failed', err.error.message),
    });
  }

  deleteMessage(id?: string) {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    this.messagesService.deleteMessage(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.messages = this.messages.filter(message => String(message.id) !== id);
          this.alertMessageService.showToast('Message deleted successfully!', 'success');
        } else {
          this.alertMessageService.showToast(res.message, 'warning');
        }
      },
      error: (err) => {
        const errorMessage = err.error?.success === false ? err.error.message : err;
        this.alertMessageService.showToast(errorMessage || 'Failed to delete message.', 'error');
      }
    });
  }

}
