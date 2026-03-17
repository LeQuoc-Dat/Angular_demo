import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth.service'
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router';
import {IconList} from '../../core/components/icon-list'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {

  isLoading = false
  iconList = inject(IconList)
  private router= inject(Router)
  private authService = inject(AuthService)
  async onLogin(form: NgForm)
  {
    this.isLoading= true
    try {
      if(form.invalid)
    {
      return;
    }
    this.authService.login(form.value.username, form.value.password).subscribe(
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
    catch(error:any)
    {
      console.log(error)
    }
    this.isLoading=false
    
  }

  controlHasError(validation_1: string,validation_2: string, controlName: string, form: NgForm)
  {
    const control = form.controls[controlName]
    return (control?.hasError(validation_1)|| control?.hasError(validation_2)) && (control.dirty || control.touched)
  }
}
