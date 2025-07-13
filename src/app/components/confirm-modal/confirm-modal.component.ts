import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [IonicModule],
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirmar Acción';
  @Input() message: string = '¿Estás seguro?';

  constructor(private modalCtrl: ModalController) {}

  dismissModal(role: 'confirm' | 'cancel') {
    this.modalCtrl.dismiss(null, role);
  }
}
