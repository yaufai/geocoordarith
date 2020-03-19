import { GeoCoordinated } from "./GeoCoordinated"

export class SimpleLocation implements GeoCoordinated {
    laptitude : number
    longtitude: number
    
    constructor(laptitude: number, longtitude: number) {
        this.laptitude  = laptitude
        this.longtitude = longtitude
    }

    getLaptitude(): number {
        return this.laptitude
    }

    getLongtitude(): number {
        return this.longtitude
    }
}