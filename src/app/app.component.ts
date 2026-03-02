import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  templateUrl: './layout/main-layout/main-layout.component.html',
  styleUrls: ['./layout/main-layout/main-layout.component.css'],
})
export class AppComponent {
  constructor (public router: Router) {
  }
  protected readonly title = signal('Angular_demo');

  isAuthPage(routerURL: string): boolean
  {
   return ['/login'].includes(routerURL)
  }
}
