import { GeoCoordinated } from "./GeoCoordinated"
import { DimensionedValue } from "unitconv/build/Dimension"
import { ANGLE_DEG, ANGLE_RAD, instantiateAngle } from "unitconv/build/BaseQuantity/Angle"

export class SimpleLocation implements GeoCoordinated {
    latitude : DimensionedValue
    longitude: DimensionedValue
    
    constructor(latitude: DimensionedValue, longtitude: DimensionedValue) {
        this.latitude  = latitude
        this.longitude = longtitude
    }

    getLatitude(): number {
        return this.latitude.getValueIn(ANGLE_DEG)
    }

    getLongitude(): number {
        return this.longitude.getValueIn(ANGLE_DEG)
    }

    getLatitudeInRad(): number {
        return this.latitude.getValueIn(ANGLE_RAD)
    }

    getLongitudeInRad(): number {
        return this.longitude.getValueIn(ANGLE_RAD)
    }
}

/**
 * 経緯度法による座標を作成する。
 * Create a geographical point.
 * @param latitude  緯度（北が正）latitude  (positive in north)
 * @param longitude 経度（東が正）longitude (positive in east )
 */
export function createLocation(latitude: number, longitude: number): SimpleLocation {
    return new SimpleLocation(
        instantiateAngle(latitude , ANGLE_DEG),
        instantiateAngle(longitude, ANGLE_DEG)
    )
}