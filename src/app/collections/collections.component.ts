import { Component } from '@angular/core';
import { RouterModule} from '@angular/router'
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-collections',
  imports: [RouterModule, DecimalPipe, FontAwesomeModule],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css', '../layout/main-layout/main-layout.component.css'],
})
export class CollectionsComponent 
{

}
