import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
    this.form = fb.group({
      email: ['baban.denis@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  async login() {
    const {session,error} = await this.authService.login(this.form.value);
    console.log(error);
    if (error) {
      //show error
    } else {
      this.router.navigateByUrl('/app',{replaceUrl:true});
    }
  }
  async register() {
    const {session,error} = await this.authService.createAccount(this.form.value);
    if (error) {
      //show error
    } else {
      console.log(session);
      this.router.navigateByUrl('/app',{replaceUrl:true});
    }
  }
}
