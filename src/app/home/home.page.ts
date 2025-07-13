import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TaskService, Task, Category } from '../services/task.service';
import { RemoteConfigService } from '../services/remote-config.service';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';
import { CategorySelectModalComponent } from '../components/category-select-modal/category-select-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalController, ToastController, IonHeader, IonToolbar, IonContent, IonList, IonItemSliding, IonItem, IonLabel, IonIcon, IonItemOptions, IonItemOption, IonFab, IonFabButton, IonButtons, IonButton, IonTitle, IonSegmentButton, IonCheckbox, IonSegment } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCheckbox, IonSegmentButton, IonTitle, IonButton, IonButtons, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonIcon, IonLabel, IonItem, IonItemSliding, IonList, IonContent, IonToolbar, IonHeader, CommonModule, FormsModule, ScrollingModule, TranslateModule, IonSegment ],
})
export class HomePage implements OnInit {
  tasks$ = this.taskService.tasks$;
  categories$ = this.taskService.categories$;
  categories: Category[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedCategory: number | 'all' = 'all';
  public categoryFilterEnabled = false;
  currentLang: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private remoteConfigService: RemoteConfigService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private toast: ToastController
  ) {
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.taskService.tasks$.forEach((task) => (this.tasks = task));
    this.categories$.forEach((cat) => (this.categories = cat));
    this.remoteConfigService.param$.subscribe({
      next: (param) => (this.categoryFilterEnabled = param),
      error: (error) => console.log(error),
    });
  }

  ionViewWillEnter() {
    this.filterTasks();
    this.remoteConfigService.isCategoryFilterEnabled();
  }

  switchLanguage() {
    debugger
    this.currentLang = this.currentLang === 'es' ? 'es' : 'en';
    this.translate.use(this.currentLang);
  }

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

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: {
        categories: this.categories,
      },
      breakpoints: [0, 0.6, 1],
      initialBreakpoint: 0.6,
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if (data && data.title) {
        const categoryId = data.categoryId == 0 ? undefined : data.categoryId;

        this.taskService.addTask(data.title, categoryId);
        this.toastView(this.translate.instant('MESSAGES.ADD_TASK'), 'success')
        this.filterTasks();
      }
    }
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
    const modal = await this.modalCtrl.create({
      component: CategorySelectModalComponent,
      componentProps: {
        categories: this.categories,
        currentCategoryId: task.categoryId,
      },
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const newCategoryId = data === 0 ? undefined : data;

      if (newCategoryId !== task.categoryId) {
        const updatedTask = { ...task, categoryId: newCategoryId };
        this.taskService.updateTask(updatedTask);
        this.toastView(this.translate.instant('MESSAGES.UPDATE_TASK'), 'success')
        this.filterTasks();
      }
    }
  }

  onStatusChange(task: Task) {
    this.taskService.updateTask(task);
    const message = task.completed? 'MESSAGES.UPDATE_STATUS_TASK_CLOSE' : 'MESSAGES.UPDATE_STATUS_TASK_OPEN';
    this.toastView(this.translate.instant(message), 'success')
  }

  deleteTask(taskToDelete: Task, index: number) {
    this.taskService.deleteTask(taskToDelete.id);
    this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
    this.filteredTasks = this.filteredTasks.filter(
      (task) => task.id !== taskToDelete.id
    );
    this.toastView(this.translate.instant('MESSAGES.TASK_DELETE'), 'primary')
  }

  getCategoryName(id?: number): string {
    if (id === undefined) return this.translate.instant('MESSAGES.NOT_CATEGORIE');
    return this.taskService.getCategoryName(id);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }
}
