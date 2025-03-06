import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buy-bulk';
}
