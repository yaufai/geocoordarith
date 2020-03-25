export interface GeoCoordinated {
    getLatitude : () => number
    getLongitude: () => number
    getLatitudeInRad : () => number
    getLongitudeInRad: () => number
}
