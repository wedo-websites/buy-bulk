import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertMessageService } from '../../services/alert-message.service';
import { tap, finalize } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit {
  
  settingsForm!: FormGroup;
  passwordForm!: FormGroup;
  id: string = '';
  isSaved: boolean = false;


  constructor( private fb: FormBuilder, private settingsService: SettingsService, private authService: AuthService, 
    private router: Router, private alertMessageService: AlertMessageService ) {}

  ngOnInit(): void {
    this.initialSettingsForm();
    this.initialPasswordForm();
    this.getSettings();
  }

  initialSettingsForm(){
    this.settingsForm = this.fb.group({
      logo_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      place: ['', Validators.maxLength(100)],
      location: ['', Validators.required],
      contact_phone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}[\s]?\d{5,10}$/)]],
      contact_email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      fb: [''],
      twitter: [''],
      linked_in: [''],
      insta: ['']
    });
  }

  initialPasswordForm(){
    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.maxLength(16)]],
      confirm_password: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  getSettings(){
    this.settingsService.getSettings().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          let data = res.data;
          this.assignFormData(data);          
        }
      },
      error: (err) => console.error('getSettings failed', err.error.message),
    });
  }

  onSubmitPassword() {

    if (!confirm('You will be logged out after changing your password. Continue?')) {
      return;
    }

    if (!this.passwordForm.valid) {
      this.alertMessageService.showToast('Please enter valid passwords', 'warning');
      return;
    }

    this.authService.changePassword(this.passwordForm.value)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.alertMessageService.showToast('Password updated successfully!', 'success');
            this.router.navigate(['/login']);
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

  assignFormData(data: any){
    this.id = data.id;
    this.settingsForm.patchValue({
      logo_name: data.logo_name,
      email: data.email,
      place: data.place,
      location: data.location,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      fb: data.fb,
      twitter: data.twitter,
      linked_in: data.linked_in,
      insta: data.insta
    });

    this.settingsForm.markAllAsTouched();
    this.settingsForm.updateValueAndValidity();
  }


  reset(){
    this.id = '';
    this.settingsForm.reset();
  }

  onSubmit() {

    if (!this.settingsForm.valid || this.id === '') {
      this.alertMessageService.showToast('Please fill the required fields', 'warning');
      return;
    }
   
    this.settingsService.updateSetting(this.id, this.settingsForm.value).pipe(tap(() => this.isSaved = true), finalize(() => this.isSaved = false)).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertMessageService.showToast('Settings updated successfully!', 'success');
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
