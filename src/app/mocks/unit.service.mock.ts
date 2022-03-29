import { BaseMock } from './base.mock';
import { areas } from './data/areas';
import { locations } from './data/locations';

const METHODS = [
  'presentAlert',
  'presentLoading',
  'dismissLoading',
  'setToStorage',
  'getFromStorage'
];
export class UtilServiceMock extends BaseMock {

  constructor() {
    super('UtilService', METHODS);

    this.spyObj.presentAlert.and.returnValue(Promise.resolve());
    this.spyObj.presentLoading.and.returnValue(Promise.resolve());
    this.spyObj.dismissLoading.and.returnValue(Promise.resolve());
    this.spyObj.setToStorage.and.returnValue(Promise.resolve());
    this.spyObj.getFromStorage.and.returnValue(Promise.resolve(locations));
  }

  public static instance(): any {
    return new UtilServiceMock();
  }

}

