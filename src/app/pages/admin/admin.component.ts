import { Component } from '@angular/core';
import { AddItemComponent } from "../../components/items/add-item/add-item.component";

@Component({
  selector: 'app-admin',
  imports: [AddItemComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
