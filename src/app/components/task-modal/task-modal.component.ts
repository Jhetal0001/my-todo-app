import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
})
export class TaskModalComponent {
  @Input() categories: Category[] = [];

  taskTitle: string = '';
  selectedCategoryId: string | number = 0;

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
