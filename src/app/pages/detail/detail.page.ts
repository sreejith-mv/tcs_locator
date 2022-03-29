import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { TCSLocation } from 'src/app/location';
import { LocationService } from 'src/app/services/location.service';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Browser } from '@capacitor/browser';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @ViewChild('map') mapView: ElementRef;

  public location: TCSLocation = null;

  constructor(
    public service: LocationService,
    private launchNavigator: LaunchNavigator,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber
  ) {
  }

  ngOnInit() {
    this.location = this.service.getSelectedLocation();
  }

  ionViewDidEnter() {
    this.createMap();
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

  public openMaps() {
    this.launchNavigator.navigate([this.location.geometry.lat, this.location.geometry.lng], {});
  }

  public openMail() {
    this.emailComposer.open({ to: this.location.email });
  }

  public openCall() {
    this.callNumber.callNumber(this.location.phone, true);
  }

  public openWebsite() {
    Browser.open({ url: this.location.websites[0].url });
  }

  private createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: 'satellite' // hybrid, satellite, terrain
      });

      this.showCurrentPosition();
    });
  }

  private async showCurrentPosition() {
    CapacitorGoogleMaps.addMarker({
      latitude: this.location.geometry.lat,
      longitude: this.location.geometry.lat,
      title: this.location.location,
      snippet: this.location.geo
    });

    CapacitorGoogleMaps.setCamera({
      latitude: this.location.geometry.lat,
      longitude: this.location.geometry.lat,
      zoom: 12,
      bearing: 0
    });
  }

}
