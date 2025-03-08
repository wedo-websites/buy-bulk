import { Component, OnInit } from '@angular/core';
import { InfoBarComponent } from "../../components/info-bar/info-bar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ImageSliderComponent } from "../../components/image-slider/image-slider.component";
import { ProductsComponent } from "../../components/products/products.component";
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { SettingsService} from "../../services/settings.service";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgIf, InfoBarComponent, NavbarComponent, ImageSliderComponent, ProductsComponent, AboutUsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  settings: any = {};

  constructor( private settingsService: SettingsService ){ }

  ngOnInit(): void {
      this.getSettings();
  }

  getSettings(){
    this.settingsService.getSettings().subscribe({
      next: (res) => {
        this.settings = res.data;
      },
      error: (err) => {

      }
    })
  }
}
