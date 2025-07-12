import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  AlertInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonIcon,
  IonFabButton,
  IonButtons,
  IonButton,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { TaskService, Task, Category } from '../services/task.service';
import { RemoteConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonSegmentButton,
    IonButton,
    IonButtons,
    IonFabButton,
    IonIcon,
    IonFab,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonCheckbox,
    IonItem,
    IonItemSliding,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  selectedCategory: number | 'all' = 'all';
  public categoryFilterEnabled = false;

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private router: Router,
    private remoteConfigService: RemoteConfigService
  ) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
    this.categories = this.taskService.getCategories();
    this.filterTasks();
    this.categoryFilterEnabled = this.remoteConfigService.isCategoryFilterEnabled();
  }

  async promptAddTask() {
    const categoryInputs: AlertInput[] = this.categories.map((category) => ({
      name: 'categoryId',
      type: 'radio' as const,
      label: category.name,
      value: category.id,
    }));

    categoryInputs.unshift({
      name: 'categoryId',
      type: 'radio' as const,
      label: 'Sin Categoría',
      value: 0,
      checked: true,
    });

    const alert = await this.alertCtrl.create({
      header: 'Nueva Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: '¿Qué necesitas hacer?',
        },
        ...categoryInputs,
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (data.title && data.title.trim() !== '') {
              const categoryId =
                data.categoryId === 0 ? undefined : data.categoryId;
              this.taskService.addTask(data.title, categoryId);
              this.ionViewWillEnter();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  filterTasks() {
    if (this.selectedCategory === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.categoryId === this.selectedCategory
      );
    }
  }

  async changeTaskCategory(task: Task) {
    const categoryInputs = this.categories.map((cat) => ({
      name: 'categoryId',
      type: 'radio' as const,
      label: cat.name,
      value: cat.id,
      checked: task.categoryId === cat.id,
    }));

    categoryInputs.unshift({
      name: 'categoryId',
      type: 'radio' as const,
      label: 'Sin Categoría',
      value: 0,
      checked: task.categoryId === undefined,
    });

    const alert = await this.alertCtrl.create({
      header: 'Seleccionar Categoría',
      inputs: categoryInputs,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Ok',
          handler: (categoryId) => {
            task.categoryId = categoryId === 0 ? undefined : categoryId;
            this.taskService.updateTask(task);
            this.filterTasks();
          },
        },
      ],
    });
    await alert.present();
  }

  onStatusChange(task: Task) {
    this.taskService.updateTask(task);
  }

  deleteTask(task: Task, slidingItem: IonItemSliding) {
    this.taskService.deleteTask(task.id);
    this.ionViewWillEnter();
    slidingItem.close();
  }

  getCategoryName(id?: number): string {
    if (id === undefined) return 'Sin Categoría';
    return this.taskService.getCategoryName(id);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }
}
