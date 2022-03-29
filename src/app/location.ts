export interface Geometry {
  lat: number;
  lng: number;
}

export interface Website {
  name: string;
  url: string;
}

export interface TCSLocation {
  area: string;
  geo: string;
  location: string;
  officeType: string[];
  additionalInfo: any[];
  address: string;
  phone: string;
  geometry: Geometry;
  email?: string;
  keywords: any[];
  id: string;
  websites?: Website[];
  fax?: string;
  distance?: number;
}
