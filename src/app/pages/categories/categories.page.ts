import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { TaskService, Category } from '../../services/task.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFabButton,
    IonFab,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonItem,
    IonItemSliding,
    IonList,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CategoriesPage {
  categories: Category[] = [];

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController
  ) {
    this.categories = this.taskService.getCategories();
  }

  async promptAddCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Categoría',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre de la categoría' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.taskService.addCategory(data.name);
          },
        },
      ],
    });
    await alert.present();
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [{ name: 'name', type: 'text', value: category.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            category.name = data.name;
            this.taskService.updateCategory(category);
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmDelete(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Borrado',
      message: `¿Estás seguro de que quieres eliminar la categoría "${category.name}"? Las tareas asociadas quedarán sin categoría.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.deleteCategory(category.id);
          },
        },
      ],
    });
    await alert.present();
  }
}
