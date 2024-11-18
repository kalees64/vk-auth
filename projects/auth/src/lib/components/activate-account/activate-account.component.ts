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
  selector: 'vk-activate-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export class ActivateAccountComponent implements OnInit {
  constructor(private fb: FormBuilder, private toast: ToastrService) {}

  activeAccountForm!: FormGroup;

  onSubmit() {
    console.log(this.activeAccountForm.value);
    this.toast.success('Account activated successfully');
    this.activeAccountForm.reset();
  }

  ngOnInit(): void {
    this.activeAccountForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      otp: [null, Validators.required],
    });
  }

  get email() {
    return this.activeAccountForm.controls['email'];
  }

  get otp() {
    return this.activeAccountForm.controls['otp'];
  }
}
