import {NgModule} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule(
   
    {
        declarations: [LoginComponent],
        imports: [FormsModule, RouterModule, FontAwesomeModule]

    }
)
export class LoginModule{}