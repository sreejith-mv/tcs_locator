import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { TCSLocation } from '../location';
import { UtilService } from './util.service';
import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private selectedLocation: TCSLocation = null;
  private locationMaster: TCSLocation[] = [];

  constructor(private utilSrv: UtilService, private http: HTTP) { }

  public setSelectedLocation(location: TCSLocation): void {
    this.selectedLocation = location;
  }

  public getSelectedLocation(): TCSLocation {
    return this.selectedLocation;
  }

  public getAllLocations(): Promise<TCSLocation[]> {
    return new Promise((resolve, reject) => {
      this.utilSrv.getFromStorage().then(storageResp => {
        if (storageResp.length !== 0) {
          this.locationMaster = storageResp;
          Network.getStatus().then(status => {
            if (status.connected) {
              this.getLocationDataFromServer();
            }
          });
          resolve(storageResp);
        } else {
          Network.getStatus().then(status => {
            if (status.connected) {
              this.getLocationDataFromServer().then(httpResp => {
                resolve(httpResp);
              }).catch(_ => {
                reject('Failed to load location from server. Please try later!');
              });
            } else {
              reject('No network avaliable!. Please check your network and try again');
            }
          });
        }
      });
    });
  }

  public getAllAeras(): Array<string> {
    return [...new Set(this.locationMaster.map(location => location.area))];
  }

  public getLocationsFilterByArea(area: string): Array<TCSLocation> {
    return area === 'all' ? this.locationMaster : this.locationMaster.filter(location => location.area === area);
  }

  public sortByNearstLocation(coordinates: Position, locationList: Array<TCSLocation>) {
    locationList = this.applyHaversine(locationList, coordinates);
    return locationList.sort((locationA, locationB) => locationA.distance - locationB.distance);
  }

  private getLocationDataFromServer(): Promise<TCSLocation[]> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.tcsLocationUrl, {}, {})
        .then(data => {
          if (data.status === 200) {
            const locationData = JSON.parse(data.data).locations;
            this.utilSrv.setToStorage(locationData);
            resolve(locationData);
          } else {
            reject(data.data);
          }
        })
        .catch(error => {
          reject(error.error);
        });
    });
  }

  private applyHaversine(locationList: Array<TCSLocation>, coordinates: Position): Array<TCSLocation> {
    const usersLocation = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };

    locationList.map((location) => {
      const placeLocation = {
        lat: location.geometry.lat,
        lng: location.geometry.lng
      };
      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      );
    });
    return locationList;
  }

  private getDistanceBetweenPoints(start, end, units): number {
    const earthRadius = {
      miles: 3958.8,
      km: 6371
    };
    const R = earthRadius[units || 'miles'];
    const lat1 = start.lat;
    const lon1 = start.lng;
    const lat2 = end.lat;
    const lon2 = end.lng;
    const dLat = this.toRad((lat2 - lat1));
    const dLon = this.toRad((lon2 - lon1));
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  private toRad(x) {
    return x * Math.PI / 180;
  }

}
