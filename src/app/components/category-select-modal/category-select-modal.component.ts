import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/services/task.service';

// No olvides importar los módulos en el decorador
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-select-modal',
  templateUrl: './category-select-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CategorySelectModalComponent implements OnInit {
  // Recibe la lista completa de categorías
  @Input() categories: Category[] = [];
  // Recibe el ID de la categoría actual de la tarea
  @Input() currentCategoryId: number | undefined;

  // Variable para guardar la selección del radio group
  selectedCategoryId: number | undefined;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Al iniciar, preselecciona la categoría actual de la tarea
    // Si no tiene categoría (undefined), selecciona '0' ("Sin Categoría")
    this.selectedCategoryId = this.currentCategoryId === undefined ? 0 : this.currentCategoryId;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    // Devuelve el ID de la categoría seleccionada
    return this.modalCtrl.dismiss(this.selectedCategoryId, 'confirm');
  }
}
