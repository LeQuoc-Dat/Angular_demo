import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  mes = 'Hello'
  ngOnInit(): void {
    this.WelcomeMes(this.mes)
  }
  WelcomeMes(mes:String)
  {
    alert(mes)
  }
}
