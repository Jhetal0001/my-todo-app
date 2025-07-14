import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonFooter, IonButton, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [IonHeader, IonButton, IonFooter, IonCol, IonRow, IonGrid, IonIcon, IonContent, IonTitle, IonToolbar, TranslateModule],
})
export class ConfirmModalComponent {
  @Input() title: string = this.translate.instant('COMMONS.COMF_ACTION');
  @Input() message: string = this.translate.instant('COMMONS.YOU_SURE');

  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  dismissModal(role: 'confirm' | 'cancel') {
    this.modalCtrl.dismiss(null, role);
  }
}
