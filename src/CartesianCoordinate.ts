import { DimensionedValue } from "unitconv/build/Dimension";
import { instantiateLength } from "unitconv/build/BaseQuantity/Length";

export type DimName = "x" | "y" | "z"

export class CartesianCoordinate {
    x: DimensionedValue
    y: DimensionedValue
    z: DimensionedValue
    constructor(x: DimensionedValue, y: DimensionedValue, z: DimensionedValue) {
        this.x = x
        this.y = y
        this.z = z
    }
    convStrDimToDim(dimName: DimName): DimensionedValue {
        if (dimName == "x") {
            return this.x
        } else if (dimName == "y") {
            return this.y
        } else {
            return this.z
        }
    }

    getEuclideanNorm(): DimensionedValue {
        let unit  = this.x.unit
        let val   = this
            .map((val, _) => val.getValueIn(unit) ** 2)
            .reduce((acc, cur) => acc + cur, 0) ** (0.5)
        return instantiateLength(val, unit)
    }

    map<T>(f: (val: DimensionedValue, dim: DimName) => T): T[] {
        return [ f(this.x, "x"), f(this.y, "y"), f(this.z, "z") ]
    }
    addedBy(x: CartesianCoordinate): CartesianCoordinate {
        let unit = x.x.unit
        let cart = this.map((val: DimensionedValue, dim: DimName) => {
            return instantiateLength(val.getValueIn(unit) + x.convStrDimToDim(dim).getValueIn(unit), unit)
        })
        return new CartesianCoordinate(cart[0], cart[1], cart[2])
    }

    scaledBy(a: number): CartesianCoordinate {
        let unit = this.x.unit
        let collec = this.map(
            (val, _) => a * val.getValueIn(unit)
        ).map((val) => instantiateLength(val, unit))
        return new CartesianCoordinate(collec[0], collec[1], collec[2])
    }

    scaledToLength(ell: DimensionedValue): CartesianCoordinate {
        let unit = ell.unit
        let scaler   = ell.getValueIn(unit) / this.getEuclideanNorm().getValueIn(unit)
        return this.scaledBy(scaler)
    }
}

export function getCartMidpoint(x: CartesianCoordinate, y: CartesianCoordinate): CartesianCoordinate {
    let unit     = x.x.unit
    let midpoint = x.addedBy(y).map((val, _) => instantiateLength(0.5 * val.getValueIn(unit), unit))
    return new CartesianCoordinate(midpoint[0], midpoint[1], midpoint[2])
}

export function getEuclideanDistance(x: CartesianCoordinate, y: CartesianCoordinate): DimensionedValue {
    let unit  = x.x.unit
    let value = [ 
        x.x.getValueIn(unit) - y.x.getValueIn(unit),
        x.y.getValueIn(unit) - y.y.getValueIn(unit),
        x.z.getValueIn(unit) - y.z.getValueIn(unit),
    ].map((diff) => diff ** 2).reduce((acc, cur) => acc + cur, 0)
    return instantiateLength(value ** (0.5), unit)
}
