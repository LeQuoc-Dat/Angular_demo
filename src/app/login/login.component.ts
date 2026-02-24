import {Component, inject} from '@angular/core';
import {AuthService} from '../auth.service'
import {NgForm,  FormsModule} from '@angular/forms'
import { Router, RouterModule, Route } from '@angular/router';
import { error } from 'console';



@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router= inject(Router)
  private authService = inject(AuthService)
  onLogin(f: NgForm):void
  {
    if (f.valid)
    {
      this.authService.login(f.value.username, f.value.password).subscribe(
        {
          next: (res) =>
          {
            this.router.navigate(['home'])
            alert('Login Suggest!')
          },
          error: (err) =>
          {
            alert('Login failed: username or password is incorrect!')
          }
        }
      )
    }
    else
    {
      alert('Fill username and password before submit')
    }
    
  }
}
