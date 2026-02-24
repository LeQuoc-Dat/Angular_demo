import {Component } from '@angular/core';
import {NgForm,  FormsModule} from '@angular/forms'


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  onLogin(f: NgForm):void
  {
    if (f.valid)
    {
      alert(`Logged`)
    }
    else
    {
      alert('Fill username and password before submit')
    }
    
  }
}
