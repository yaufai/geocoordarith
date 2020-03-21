import { GeoCoordinated } from "./GeoCoordinated"
import { SimpleLocation } from "./SimpleLocation"
import { isNullOrUndefined } from "util"
import { LENGTH_METER, instantiateLength, LENGTH_KILOMETER }   from "unitconv/build/BaseQuantity/Length"
import { NotImplementedException } from 'ts-exts/build/Exception'

export function getCentroid(points: GeoCoordinated[]): SimpleLocation {
    throw new NotImplementedException()
}

/*
Returns the distance between x and y on the earth, assuming it is a perfect sphere.
*/ 
export function getDistance(x: GeoCoordinated, y: GeoCoordinated, unitName?: string): number {
    let unit   = isNullOrUndefined(unitName) ? LENGTH_METER : unitName
    let radius = instantiateLength(6370, LENGTH_KILOMETER)
    let sin = Math.sin(x.getLongtitudeInRad()) * Math.sin(y.getLongtitudeInRad())
    let cos = Math.cos(x.getLongtitudeInRad()) * Math.cos(y.getLongtitudeInRad()) * Math.cos(
        x.getLaptitudeInRad() - y.getLaptitudeInRad()
    )
    return radius.getValueIn(unit) * Math.acos(cos + sin)
}