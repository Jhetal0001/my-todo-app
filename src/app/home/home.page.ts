import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskService, Task, Category } from '../services/task.service';
import { RemoteConfigService } from '../services/remote-config.service';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';
import { CategorySelectModalComponent } from '../components/category-select-modal/category-select-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, ScrollingModule],
})
export class HomePage implements OnInit {
  tasks$ = this.taskService.tasks$;
  categories$ = this.taskService.categories$;
  categories: Category[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedCategory: number | 'all' = 'all';
  public categoryFilterEnabled = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private remoteConfigService: RemoteConfigService,
    private modalCtrl: ModalController
  ) {}

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

        this.filterTasks();
      }
    }
  }

  onStatusChange(task: Task) {
    this.taskService.updateTask(task);
  }

  deleteTask(taskToDelete: Task, index: number) {
    this.taskService.deleteTask(taskToDelete.id);
    this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
    this.filteredTasks = this.filteredTasks.filter(
      (task) => task.id !== taskToDelete.id
    );
  }

  getCategoryName(id?: number): string {
    if (id === undefined) return 'Sin Categoría';
    return this.taskService.getCategoryName(id);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }
}
