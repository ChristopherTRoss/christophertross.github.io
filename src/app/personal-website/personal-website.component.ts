import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-personal-website',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './personal-website.component.html',
  styleUrl: './personal-website.component.css'
})
export class PersonalWebsiteComponent {

  routeToLink(url: string) {
    window.location.href = url;
  }
  
}
