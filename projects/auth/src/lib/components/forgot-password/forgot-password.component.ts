import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'vk-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private toast: ToastrService) {}

  forgotPasswordForm!: FormGroup;

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.toast.success('Password chage link sent to your email successfully');
    this.forgotPasswordForm.reset();
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.controls['email'];
  }
}
