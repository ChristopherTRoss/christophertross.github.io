import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonalWebsiteComponent } from './personal-website/personal-website.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PersonalWebsiteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-website';
}
