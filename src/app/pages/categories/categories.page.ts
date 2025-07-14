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
  ToastController,
} from '@ionic/angular/standalone';
import { TaskService, Category } from '../../services/task.service';
import { CategoryModalComponent } from 'src/app/components/category-modal/category-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule
  ],
})
export class CategoriesPage {
  categories$ = this.taskService.categories$;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private toast: ToastController,
  ) {}

  async toastView(message: string, color: string, position: 'top' | 'bottom' | 'middle' = 'bottom') {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: position,
      color: color,
      animated: true,
    });
    toast.present();
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      breakpoints: [0, 0.25, 0.8, 1],
      initialBreakpoint: 0.8,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.taskService.addCategory(data);
      this.toastView(this.translate.instant('MESSAGES.ADD_CATEGORIE'), 'success')
    }
  }

  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        category: category,
      },
      breakpoints: [0, 0.25, 0.8, 1],
      initialBreakpoint: 0.8,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const updatedCategory: Category = {
        ...category,
        name: data,
      };
      this.taskService.updateCategory(updatedCategory);
      this.toastView(this.translate.instant('MESSAGES.UPDATE_CAT'), 'success')
    }
  }

  async confirmDelete(category: Category) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('MESSAGES.DELETE_CAT', { name: category.name }),
      subHeader:  this.translate.instant('MESSAGES.ACTION_NOT_UNDONE'),
      buttons: [
        {
          text: this.translate.instant('COMMONS.YES_DELETE'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.taskService.deleteCategory(category.id);
            this.toastView(this.translate.instant('MESSAGES.CAT_DELETE'), 'primary')
          },
        },
        {
          text: this.translate.instant('COMMONS.NOT_KEEP'),
          role: 'cancel',
          icon: 'close',
          handler: () => {
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
