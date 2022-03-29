import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { TCSLocation } from '../location';

const TCS_DATA = 'tcs_data';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  private loading: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  public async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async presentLoading(): Promise<void> {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();

  }

  public async dismissLoading(): Promise<void> {
    await this.loading.dismiss();
  }

  public async setToStorage(data: Array<TCSLocation>): Promise<void> {
    await Storage.set({
      key: TCS_DATA,
      value: JSON.stringify(data)
    });
  }

  public async getFromStorage(): Promise<TCSLocation[]> {
    return new Promise(resolve => {
      Storage.get({ key: TCS_DATA, }).then(data => {
        if (data.value) { resolve(JSON.parse(data.value)); } else { resolve([]); };
      });
    });
  }
}
