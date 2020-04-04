# はじめに

Geocoordarithは経度緯度に基づいたさまざまな計算を行うためのライブラリです。

## 簡単な例

```ts
import { createLocation } from "geocoordarith/build/src/SimpleLocation"
import { getDistance, getMidpoint } from "geocoordarith/build/src/GeoCoords"

const TokyoStation = createLocation(35.681540, 139.767209)
const OsakaStation = createLocation(34.702776, 135.496090)
console.log(getDistance(TokyoStation, OsakaStation, 'km'))
// -> 403.5031624306115
const middle = getMidpoint(TokyoStation, OsakaStation))
console.log(middle.getLatitude(), middle.getLongitude())
// -> 35.21090841886774 137.61877971013595
// 注）長野県下伊那郡根羽村
```

## インストール

最新版はnpmでインストールすることができます。
```
npm install geocoordarith
```

# ドキュメント

## `GeoCoordinated`

geocoordarithでの計算は経緯度を提供するインターフェースを実装するすべてのオブジェクトに対して行うことができます。

`GeoCoordinated`インターフェースを実装するためには、緯度経度を度数法で与える`getLatitude`, `getLongitude`と弧度法で与える`getLatitudeInRad`, `getLongitudeInRad`を実装する必要があります。

`GeoCoordinated`インターフェースを実装するもっとも簡単なクラスは`SimpleLocation`です。ただ、`new SimpleLocation(x, y)`によってオブジェクトを作るのは推奨しません。代わりに`createLocation`では、（度数法での）緯度経度で簡単に`SimpleLocation`オブジェクトを生成できます。

例
```ts
import { createLocation } from "geocoordarith/build/src/SimpleLocation"

const TokyoStation = createLocation(35.681540, 139.767209)
```

なお、`new SimpleLocation(x, y)`で直接オブジェクトを作る際には、自分で度数法と弧度法の変換に関する情報を[unitconv](https://github.com/yaufai/unitconv)を使って自分で実装する必要があります。

## 距離の計算

地球を半径6378.137KMの完全な球体と仮定して距離の計算を行うには、`GeoCoords.getDistance`関数を利用します。

```ts
/**
 * 地球を完全な球体と仮定して球面上の二点間の距離を計算する。
 * Returns the distance between x and y on the earth, assuming it is a perfect sphere.
 * @param x 
 * @param y 
 * @param unitName km, m, cm
 */
export declare function getDistance(x: GeoCoordinated, y: GeoCoordinated, unitName?: string): number;
```

`unitName`は現在

* km: キロメートル
* m : メートル
* cm: センチメートル

のみ対応しています。`unitName`を指定しないときはメートルでの値を返します。

例
```ts
import { createLocation } from "geocoordarith/build/src/SimpleLocation"
import { getDistance } from "geocoordarith/build/src/GeoCoords"

const TokyoStation = createLocation(35.681540, 139.767209)
const OsakaStation = createLocation(34.702776, 135.496090)
console.log(getDistance(TokyoStation, OsakaStation, 'km'))
// -> 403.5031624306115
```

## 中点の計算


地球を半径6378.137KMの完全な球体と仮定して、二点の中点の計算を行うには、`GeoCoords.getMidpoint`関数を利用します。

```ts
/**
 * 地球を完全な球体と仮定して、二点の球面上の中点を求める。
 * Returns the midpoint between x and y on the earth, assuming it is a perfect sphere.
 * @param x 
 * @param y 
 */
export declare function getMidpoint(x: GeoCoordinated, y: GeoCoordinated): SimpleLocation;
```


例
```ts
import { createLocation } from "geocoordarith/build/src/SimpleLocation"
import { getMidpoint } from "geocoordarith/build/src/GeoCoords"

const TokyoStation = createLocation(35.681540, 139.767209)
const OsakaStation = createLocation(34.702776, 135.496090)
const middle = getMidpoint(TokyoStation, OsakaStation))
console.log(middle.getLatitude(), middle.getLongitude())
// -> 35.21090841886774 137.61877971013595
```
