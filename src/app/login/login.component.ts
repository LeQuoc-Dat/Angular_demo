import {Component, inject} from '@angular/core';
import {AuthService} from '../auth/auth.service'
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  private router= inject(Router)
  private authService = inject(AuthService)
  onLogin(f: NgForm):void
  {
    if(f.invalid)
    {
      return;
    }
    this.authService.login(f.value.username, f.value.password).subscribe(
      {
        next: (res) =>
        {
          alert('Login Suggest!')
          this.router.navigate(['home'])
        },
        error: (err) =>
        {
          alert('Login failed: username or password is incorrect!')
        }
      })
  }
}
