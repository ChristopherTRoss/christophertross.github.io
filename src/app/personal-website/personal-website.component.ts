import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";


@Component({
  selector: 'app-personal-website',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './personal-website.component.html',
  styleUrl: './personal-website.component.css'
})
export class PersonalWebsiteComponent {

  constructor(private matIconReg: MatIconRegistry) {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }

  routeToLink(url: string) {
    window.location.href = url;
  }
  
}
