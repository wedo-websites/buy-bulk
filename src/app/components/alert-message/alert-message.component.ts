import { Component } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  imports: [CommonModule, NgIf, NgClass],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss'
})
export class AlertMessageComponent {
  icon:string = 'success';
  message: string = '';

  constructor(public alertMessageService: AlertMessageService) {}
  
}
