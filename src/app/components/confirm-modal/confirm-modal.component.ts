import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [IonicModule, TranslateModule],
})
export class ConfirmModalComponent {
  @Input() title: string = this.translate.instant('COMMONS.COMF_ACTION');
  @Input() message: string = this.translate.instant('COMMONS.YOU_SURE');

  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  dismissModal(role: 'confirm' | 'cancel') {
    this.modalCtrl.dismiss(null, role);
  }
}
