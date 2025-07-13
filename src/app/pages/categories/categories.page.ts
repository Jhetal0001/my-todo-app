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
  ActionSheetController,
  ModalController,
} from '@ionic/angular/standalone';
import { TaskService, Category } from '../../services/task.service';
import { CategoryModalComponent } from 'src/app/components/category-modal/category-modal.component';

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
  categories$ = this.taskService.categories$;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log('Categoría a guardar:', data);
      this.taskService.addCategory(data);
    }
  }

  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        category: category,
      },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const updatedCategory: Category = {
        ...category,
        name: data,
      };
      this.taskService.updateCategory(updatedCategory);
    }
  }

  async confirmDelete(category: Category) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `¿Eliminar la categoría "${category.name}"?`,
      subHeader: 'Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Sí, eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.taskService.deleteCategory(category.id);
            console.log(`Categoría ${category.name} eliminada`);
          },
        },
        {
          text: 'No, conservar',
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
            console.log('Borrado cancelado');
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
