import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-arrival',
  imports: [RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../../layout/main-layout/main-layout.component.css'],
})
export class CategoriesComponent {
  constructor (private router: Router){}
  
  OnCategoryClick(categoryName: string)
  {
    this.router.navigate(['/collections', categoryName])
  }
}
