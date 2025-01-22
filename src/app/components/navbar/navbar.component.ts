import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuOpen = false;
  activeTab: string = 'home';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const subscription =this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.route.snapshot.fragment;
        this.activeTab = fragment || 'home';
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  

  disableMenu() {
    this.menuOpen = false;
  }
}
