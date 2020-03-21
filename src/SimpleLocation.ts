import { GeoCoordinated } from "./GeoCoordinated"
import { DimensionedValue } from "unitconv/build/Dimension"
import { ANGLE_DEG, ANGLE_RAD } from "unitconv/build/BaseQuantity/Angle"

export class SimpleLocation implements GeoCoordinated {
    laptitude : DimensionedValue
    longtitude: DimensionedValue
    
    constructor(laptitude: DimensionedValue, longtitude: DimensionedValue) {
        this.laptitude  = laptitude
        this.longtitude = longtitude
    }

    getLaptitude(): number {
        return this.laptitude.getValueIn(ANGLE_DEG)
    }

    getLongtitude(): number {
        return this.longtitude.getValueIn(ANGLE_DEG)
    }

    getLaptitudeInRad(): number {
        return this.laptitude.getValueIn(ANGLE_RAD)
    }

    getLongtitudeInRad(): number {
        return this.longtitude.getValueIn(ANGLE_RAD)
    }
}