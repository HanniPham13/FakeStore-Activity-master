import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.components.html',
  styleUrls: ['./home.components.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  onGetStarted(): void {
    this.router.navigate(['/product-management']);
  }
}
