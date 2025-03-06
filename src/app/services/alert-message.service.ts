import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private messageSource = new BehaviorSubject<{ message: string; type: string } | null>(null);
  message$ = this.messageSource.asObservable();
  
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.messageSource.next({ message, type });
    setTimeout(() => this.messageSource.next(null), 3000);
  }
}
