import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { LocationServiceMock } from 'src/app/mocks/location.service.mock';
import { UtilServiceMock } from 'src/app/mocks/unit.service.mock';
import { LocationService } from 'src/app/services/location.service';
import { UtilService } from 'src/app/services/util.service';
import { DetailPage } from '../detail/detail.page';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';
import { areas } from 'src/app/mocks/data/areas';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { DebugElement } from '@angular/core';
import { browser } from 'protractor';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, SearchPipe],
      imports: [IonicModule.forRoot(),
      RouterTestingModule.withRoutes([{
        path: 'register',
        component: DetailPage
      }
      ])],
      providers: [
        { provide: LocationService, useValue: LocationServiceMock },
        { provide: UtilService, useValue: UtilServiceMock },
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.service = LocationServiceMock.instance();
    component.utilService = UtilServiceMock.instance();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change area', () => {
    component.areaList = areas;
    component.isLocationSortEnabled = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(component, 'onAreaChange');

      const select: HTMLInputElement = fixture.debugElement.query(By.css('.area-select')).nativeElement;
      console.log(select.childNodes[1]);
      select.childNodes[1].dispatchEvent(new Event('click'));
      // select.dispatchEvent(new Event('select'));
      select.click();
      fixture.detectChanges();



      // const options: DebugElement[] = fixture.debugElement.queryAll(By.css('.area-select-options'));
      // console.log(options[1].nativeElement);
      // const secondOption: HTMLInputElement = options[0].nativeElement;
      // secondOption.click();      // secondOption.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      // expect(component.onAreaChange).toHaveBeenCalled();
    });
  });

  it('should sort location list', () => {
    component.isLocationSortEnabled = true;
    spyOn(Geolocation, 'requestPermissions').and.returnValue(Promise.resolve({
      location: 'granted',
      coarseLocation: 'granted'
    }));

    fixture.detectChanges();
    fixture.whenStable().then(
      () => {
        // const options: DebugElement[] = fixture.debugElement.queryAll(By.css('.sort-toggle'));
        // const secondOption: HTMLInputElement = options[1].nativeElement;
        // secondOption.checked = true;
        // secondOption.dispatchEvent(new Event('click'));
        // expect(component.onSortClick).toHaveBeenCalled();
      }
    );
    // component.onSortClick();
  });
});
