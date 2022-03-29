import { BaseMock } from './base.mock';
import { areas } from './data/areas';
import { locations } from './data/locations';

const METHODS = [
  'setSelectedLocation',
  'getSelectedLocation',
  'getAllLocations',
  'getAllAeras',
  'getLocationsFilterByArea',
  'sortByNearstLocation'
];
export class LocationServiceMock extends BaseMock {

  constructor() {
    super('LocationService', METHODS);

    this.spyObj.setSelectedLocation.and.returnValue(null);
    this.spyObj.getSelectedLocation.and.returnValue(locations[0]);
    this.spyObj.getAllLocations.and.returnValue(Promise.resolve(locations));
    this.spyObj.getAllAeras.and.returnValue(areas);
    this.spyObj.getLocationsFilterByArea.and.returnValue(locations);
    this.spyObj.sortByNearstLocation.and.returnValue(Promise.resolve(locations));
  }

  public static instance(): any {
    return new LocationServiceMock();
  }

}

