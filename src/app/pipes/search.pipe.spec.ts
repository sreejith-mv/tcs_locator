import { locations } from '../mocks/data/locations';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('it should search and return filtered value', () => {
    expect(pipe.transform(locations, 'Seven Hills Park')).toEqual([locations[0]]);
  });

  it('it should return all values if no querry', () => {
    expect(pipe.transform(locations, null)).toEqual(locations);
  });
});
