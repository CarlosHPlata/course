export interface GoogleMapsRes {
  results: Results[]
}

export interface Results {
  types: string[]
  address_components: AddressComponents[]
}

export interface AddressComponents {
  short_name: string
}
