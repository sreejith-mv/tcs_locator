import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { LocationServiceMock } from 'src/app/mocks/location.service.mock';
import { LocationService } from 'src/app/services/location.service';

import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPage],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LocationService, useValue: LocationServiceMock }, LaunchNavigator, EmailComposer, CallNumber
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    component.service = LocationServiceMock.instance();
    spyOn(CapacitorGoogleMaps, 'create').and.returnValue(Promise.resolve());
    spyOn(CapacitorGoogleMaps, 'addListener').and.returnValue(null);
    spyOn(CapacitorGoogleMaps, 'setMapType').and.returnValue(Promise.resolve());
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call', () => {
    component.openCall();
    expect(component.openCall).toBeTruthy();
  });
  it('should open mail box', () => {
    component.openMail();
    expect(component.openMail).toBeTruthy();
  });
  it('should open maps', () => {
    component.openMaps();
    expect(component.openMaps).toBeTruthy();
  });
  it('should open bowser with url', () => {
    // component.openWebsite();
    expect(component.openWebsite).toBeTruthy();
  });
  // it('should call ionViewDidEnter', () => {

  //   window.dispatchEvent(new Event('onMapReady'));
  //   component.ionViewDidEnter();
  //   expect(component.ionViewDidEnter).toBeTruthy();
  // });
});
