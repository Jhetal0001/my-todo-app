import { Component } from '@angular/core';
import {
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
} from '@ionic/angular/standalone';
import { TaskService, Task } from '../services/task.service';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
    FormsModule,
  ],
})
export class HomePage {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private alertController: AlertController
  ) {
    this.tasks = this.taskService.getTasks();
  }

  async promptAddTask() {
    const alert = await this.alertController.create({
      header: 'Nueva Tarea',
      inputs: [
        { name: 'title', type: 'text', placeholder: '¿Qué necesitas hacer?' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            this.taskService.addTask(data.title);
          },
        },
      ],
    });
    await alert.present();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  onStatusChange(task: Task) {
    this.taskService.updateTaskStatus(task.id, task.completed);
  }
}
