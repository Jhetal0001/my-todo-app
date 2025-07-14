import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { TranslateModule } from '@ngx-translate/core';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonItem, IonInput, ModalController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  imports: [IonItem, IonContent, IonTitle, IonButtons, IonToolbar, IonHeader, IonButton, FormsModule, TranslateModule, IonInput ],
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
