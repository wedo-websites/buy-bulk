import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { AlertMessageService } from '../../services/alert-message.service';
import { MessagesService } from "../../services/messages.service";
import { tap, finalize } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [NgIf, FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnChanges {

  @Input() settings: any = {};
  contactForm: FormGroup;
  isSaved: boolean = false;
  safeMapUrl!: SafeResourceUrl;

  constructor(private fb: FormBuilder, private messagesService: MessagesService, private alertMessageService: AlertMessageService, private sanitizer: DomSanitizer) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      msg: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']?.currentValue?.location) {
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.settings.location);
    }
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.alertMessageService.showToast('Please fill all required fields', 'warning');
      return;
    }
    this.messagesService.createMessage(this.contactForm.value).pipe(tap(() => this.isSaved = true), finalize(() => this.isSaved = false)).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertMessageService.showToast('Thanks for contacting us! We will get back to you shortly.', 'success');
          this.contactForm.reset();
        } else {
          this.alertMessageService.showToast(res.message, 'warning');
        }
      },
      error: (err) => {
        const errorMessage = err.error?.success === false ? err.error.message : err;
        this.alertMessageService.showToast(errorMessage, 'error');
      }
    });
  }

}
