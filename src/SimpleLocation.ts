import { GeoCoordinated } from "./GeoCoordinated"
import { DimensionedValue } from "unitconv/build/Dimension"
import { ANGLE_DEG, ANGLE_RAD } from "unitconv/build/BaseQuantity/Angle"

export class SimpleLocation implements GeoCoordinated {
    latitude : DimensionedValue
    longtitude: DimensionedValue
    
    constructor(latitude: DimensionedValue, longtitude: DimensionedValue) {
        this.latitude  = latitude
        this.longtitude = longtitude
    }

    getLatitude(): number {
        return this.latitude.getValueIn(ANGLE_DEG)
    }

    getLongitude(): number {
        return this.longtitude.getValueIn(ANGLE_DEG)
    }

    getLatitudeInRad(): number {
        return this.latitude.getValueIn(ANGLE_RAD)
    }

    getLongitudeInRad(): number {
        return this.longtitude.getValueIn(ANGLE_RAD)
    }
}