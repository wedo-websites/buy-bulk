import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { ImageSliderComponent } from "./components/image-slider/image-slider.component";
import { ItemsComponent } from "./components/items/items.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, InfoBarComponent, ImageSliderComponent, ItemsComponent, ContactComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buy-bulk';
}
