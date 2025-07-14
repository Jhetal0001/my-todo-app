import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonRadio, ModalController, IonRadioGroup } from "@ionic/angular/standalone";

@Component({
  selector: 'app-category-select-modal',
  templateUrl: './category-select-modal.component.html',
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonItem, IonLabel, IonListHeader, IonList, IonContent, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, CommonModule, FormsModule, TranslateModule],
})
export class CategorySelectModalComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() currentCategoryId: number | undefined;

  selectedCategoryId: number | undefined;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.selectedCategoryId =
      this.currentCategoryId === undefined ? 0 : this.currentCategoryId;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.selectedCategoryId, 'confirm');
  }
}
