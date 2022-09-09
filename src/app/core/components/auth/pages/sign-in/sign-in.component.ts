import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ============================ //
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  // ============================ //
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  // ============================ //
  ngOnInit(): void {}
  // ============================ //
  public msgError!: string;
  // ============================ //
  public formAuth: FormGroup = this.fb.group({
    email: ['mateuussilvapb@gmail.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
  });
  // ============================ //
  public submitForm() {
    if (this.formAuth.valid) {
      this.authService
        .signIn({
          email: this.formAuth.value.email,
          password: this.formAuth.value.password,
        })
        .subscribe({
          next: (response) => response,
          error: (error) => (this.msgError = error),
        });
    }
  }
}
