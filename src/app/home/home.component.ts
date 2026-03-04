import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../layout/main-layout/main-layout.component.css'],
})
export class HomeComponent {
}
