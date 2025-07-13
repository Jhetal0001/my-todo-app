import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  imports: [IonicModule, FormsModule, TranslateModule ],
})
export class CategoryModalComponent implements OnInit {
  @Input() category!: Category;

  categoryName: string = '';
  isEditMode = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.category) {
      this.isEditMode = true;
      this.categoryName = this.category.name;
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  saveAndClose() {
    if (!this.categoryName || this.categoryName.trim() === '') {
      return;
    }
    this.modalCtrl.dismiss(this.categoryName.trim(), 'confirm');
  }
}
