import { GeoCoordinated } from "./GeoCoordinated"
import { SimpleLocation } from "./SimpleLocation"
import { isNullOrUndefined } from "util"
import { LENGTH_METER, instantiateLength, LENGTH_KILOMETER }   from "unitconv/build/BaseQuantity/Length"
import { DimensionedValue } from "unitconv/build/Dimension"
import { EARTH_RADIUS_DIM } from "./Constants"
import { instantiateAngle, ANGLE_RAD } from "unitconv/build/BaseQuantity/Angle"
import { CartesianCoordinate } from "./CartesianCoordinate"

/*
Represent the given point in Cartesian coordinates, where
- latitude  : East positive
- longtitude: North positive
- the Earth is a perfect sphere
*/ 
export function convertToCartesianCoordinate(x: GeoCoordinated, radius: DimensionedValue, unitName?: string): CartesianCoordinate {
    let unit = isNullOrUndefined(unitName) ? LENGTH_KILOMETER : unitName
    let earthRadius = radius.getValueIn(unit)
    return new CartesianCoordinate(
        instantiateLength(earthRadius * Math.cos(x.getLatitudeInRad()) * Math.cos(x.getLongitudeInRad()), unit),
        instantiateLength(earthRadius * Math.cos(x.getLatitudeInRad()) * Math.sin(x.getLongitudeInRad()), unit),
        instantiateLength(earthRadius * Math.sin(x.getLatitudeInRad()), unit)
    )
}

export function getMidpoint(x: GeoCoordinated, y: GeoCoordinated): SimpleLocation {
    let unit   = LENGTH_KILOMETER
    let cart_x = convertToCartesianCoordinate(x, EARTH_RADIUS_DIM, unit)
    let cart_y = convertToCartesianCoordinate(y, EARTH_RADIUS_DIM, unit)
    let m      = cart_x.addedBy(cart_y).scaledToLength(EARTH_RADIUS_DIM)

    let lat = Math.asin(m.z.getValueIn(unit)/EARTH_RADIUS_DIM.getValueIn(unit))
    let lng = Math.atan2(m.y.getValueIn(unit), m.x.getValueIn(unit))
    return new SimpleLocation(instantiateAngle(lat, ANGLE_RAD), instantiateAngle(lng, ANGLE_RAD))
}

/*
Returns the distance between x and y on the earth, assuming it is a perfect sphere.
*/ 
export function getDistance(x: GeoCoordinated, y: GeoCoordinated, unitName?: string): number {
    let unit   = isNullOrUndefined(unitName) ? LENGTH_METER : unitName
    let sin = Math.sin(x.getLongitudeInRad()) * Math.sin(y.getLongitudeInRad())
    let cos = Math.cos(x.getLongitudeInRad()) * Math.cos(y.getLongitudeInRad()) * Math.cos(
        x.getLatitudeInRad() - y.getLatitudeInRad()
    )
    return EARTH_RADIUS_DIM.getValueIn(unit) * Math.acos(cos + sin)
}