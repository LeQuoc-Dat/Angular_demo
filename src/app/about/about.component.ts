import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../layout/main-layout/main-layout.component.css'],
})
export class AboutComponent {}