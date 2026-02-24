import {Component, inject} from '@angular/core';
import {NgForm,  FormsModule} from '@angular/forms'
import { Router, RouterModule, Route } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router= inject(Router)
  onLogin(f: NgForm):void
  {
    if (f.valid)
    {
      this.router.navigate(['/home'])
    }
    else
    {
      alert('Fill username and password before submit')
    }
    
  }
}
