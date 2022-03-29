import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(locations: any, query: string): any {
    if (!query) {
      return locations;
    }
    return locations.filter((loca) => loca.location.toLowerCase().match(query.toLowerCase())
      || loca.geo.toLowerCase().match(query.toLowerCase())
      || loca.area.toLowerCase().match(query.toLowerCase()));
  }
}
