import { Component, OnInit, OnDestroy, HostListener, Renderer2, AfterViewInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-website',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-website.component.html',
  styleUrls: ['./personal-website.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalWebsiteComponent implements OnInit, AfterViewInit, OnDestroy {

  isDarkMode = false;
  isScrolled = false;
  activeSection = 'about';

  private readonly sections = ['about', 'education', 'work', 'projects'];
  private cardObserver!: IntersectionObserver;

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      this.renderer.setAttribute(document.documentElement, 'data-theme', 'dark');
    }
  }

  ngAfterViewInit(): void {
    this.updateScrolled();
    this.updateActiveSection();
    setTimeout(() => {
      this.updateNavHighlight();
      this.observeCardAnimations();
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.cardObserver) this.cardObserver.disconnect();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.setAttribute(document.documentElement, 'data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeAttribute(document.documentElement, 'data-theme');
      localStorage.setItem('theme', 'light');
    }
    setTimeout(() => this.updateNavHighlight(), 50);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrolled();
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateNavHighlight();
  }

  private updateScrolled(): void {
    this.isScrolled = window.scrollY > 20;
  }

  private updateActiveSection(): void {
    let current = 'about';
    for (const id of this.sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 80) {
        current = id;
      }
    }
    this.activeSection = current;
    this.ngZone.run(() => {
      setTimeout(() => this.updateNavHighlight(), 0);
    });
  }

  updateNavHighlight(targetLink?: HTMLElement): void {
    const hl = document.getElementById('nav-highlight');
    const mr = document.getElementById('menu-right');
    if (!hl || !mr) return;
    const activeLink = targetLink
      || document.querySelector(`#menu-right a[data-section="${this.activeSection}"]`) as HTMLElement
      || document.querySelector('#menu-right a') as HTMLElement;
    if (!activeLink) return;
    const mrRect = mr.getBoundingClientRect();
    const lRect  = activeLink.getBoundingClientRect();
    hl.style.left  = (lRect.left - mrRect.left) + 'px';
    hl.style.width = lRect.width + 'px';
  }

scrollTo(event: Event, sectionId: string): void {
  event.preventDefault();
  if (sectionId === 'about') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const target = document.getElementById(sectionId);
    if (target) {
      const navHeight = (document.getElementById('nav')?.offsetHeight ?? 52) - 8;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  this.activeSection = sectionId;
  const link = event.target as HTMLElement;
  setTimeout(() => this.updateNavHighlight(link), 0);
}

  routeToLink(url: string): void {
    window.open(url, '_blank', 'noopener noreferrer');
  }

  private observeCardAnimations(): void {
    this.ngZone.runOutsideAngular(() => {
      this.cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add('visible');
            }, i * 80);
            this.cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.card-animate').forEach(el => {
        this.cardObserver.observe(el);
      });
    });
  }

  sidebarClick(item: HTMLElement): void {
    const target = item.getAttribute('data-target');
    const sidebar = item.closest('.ss-sidebar') as HTMLElement;
    const window_ = item.closest('.ss-window') as HTMLElement;
    const content = window_.querySelector('.ss-content') as HTMLElement;

    sidebar.querySelectorAll('.ss-sidebar-item').forEach(s => s.classList.remove('active'));
    item.classList.add('active');

    content.querySelectorAll<HTMLElement>('.ss-group, .ss-row').forEach(el => { el.classList.remove('ss-highlighted'); (el as HTMLElement).style.opacity = '1'; });

    if (target === 'grp-ibm' || target === 'grp-af' || target === 'grp-jacobs' ||
        target === 'grp-edu-degree' || target === 'grp-edu-honors' || target === 'grp-edu-courses' || target === 'grp-edu-skills') {
      const grp = document.getElementById(target!);
      if (grp) grp.querySelectorAll<HTMLElement>('.ss-row').forEach(r => r.classList.add('ss-highlighted'));
      return;
    }

    const rows = content.querySelectorAll<HTMLElement>('.ss-row[data-tags]');
    if (target === 'grp-all') {
      rows.forEach(r => r.classList.add('ss-highlighted'));
    } else {
      const tagMap: Record<string, string> = { 'grp-android': 'android', 'grp-web': 'web', 'grp-java': 'java' };
      const tag = tagMap[target!];
      rows.forEach(r => {
        if (r.getAttribute('data-tags') === tag) r.classList.add('ss-highlighted');
      });
    }
  }
}