import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';
import { TCSLocation } from 'src/app/location';
import { LocationService } from '../../services/location.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public locationList: TCSLocation[] = [];
  public areaList: string[] = [];
  public query = '';
  public isLocationSortEnabled = false;
  public errorMessage = 'Fetching data from server';

  constructor(
    public service: LocationService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) {
  }
  ngOnInit(): void {
    this.service.getAllLocations().then(resp => {
      this.locationList = resp;
      this.areaList = this.service.getAllAeras();
    }).catch(err => {
      this.utilService.presentAlert(err);
    });
  }

  public onAreaChange(ev) {
    console.log('----------Testing------------');
    this.locationList = this.service.getLocationsFilterByArea(ev.detail.value);
    if (this.isLocationSortEnabled) {
      this.sortByLocation();
    }
  }

  public onSortClick() {
    if (this.isLocationSortEnabled) {
      this.sortByLocation();
    }
  }

  alert() {
    console.log('----------Click Testing------------');
  }

  onLocationClick(location: TCSLocation) {
    this.service.setSelectedLocation(location);
    this.navCtrl.navigateForward('/detail');
  }

  private sortByLocation() {
    this.utilService.presentLoading();
    Geolocation.requestPermissions().then(premission => {
      if (premission) {
        Geolocation.getCurrentPosition().then(coordinates => {
          this.locationList = this.service.sortByNearstLocation(coordinates, this.locationList);
          this.utilService.dismissLoading();
        }).catch(_ => {
          this.utilService.dismissLoading();
          this.errorMessage = 'Failed to fetch location!';
        });
      } else {
        this.utilService.dismissLoading();
        this.errorMessage = 'Failed to fetch location due to no permission to access current location!';
      }

    }).catch(_ => {
      this.utilService.dismissLoading();
      this.errorMessage = 'Failed to fetch location due toissuein getting permission to access current location!';
    });
  }

}
