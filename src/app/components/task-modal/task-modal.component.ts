import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonListHeader, IonLabel, IonRadio, IonInput, ModalController, IonRadioGroup, IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  imports: [IonList, IonRadioGroup, IonRadio, IonLabel, IonListHeader, IonItem, IonContent, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, CommonModule, FormsModule, IonInput, TranslateModule],
})
export class TaskModalComponent {
  @Input() categories: Category[] = [];

  taskTitle: string = '';
  selectedCategoryId: string | number = '0';

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  saveAndClose() {
    if (!this.taskTitle || this.taskTitle.trim() === '') {
      return;
    }

    const taskData = {
      title: this.taskTitle.trim(),
      categoryId: this.selectedCategoryId,
    };

    this.modalCtrl.dismiss(taskData, 'confirm');
  }
}
