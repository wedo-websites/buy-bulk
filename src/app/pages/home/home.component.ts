import { Component } from '@angular/core';
import { InfoBarComponent } from "../../components/info-bar/info-bar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ImageSliderComponent } from "../../components/image-slider/image-slider.component";
import { ItemsComponent } from "../../components/items/items.component";
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { ContactComponent } from "../../components/contact/contact.component";

@Component({
  selector: 'app-home',
  imports: [InfoBarComponent, NavbarComponent, ImageSliderComponent, ItemsComponent, AboutUsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
