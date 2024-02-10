import { converter } from 'culori'
import type { Oklch, Hsl } from 'culori'
import type {
  TStringToStringArray,
  TConvertHexValue,
  TOklchStringFromHex
} from '../models'

const oklchConverter = converter('oklch')
const hslConverter = converter('hsl')

// let oklch: Oklch = { c: 0.11, h: 150, l: 0.57, mode: 'oklch' }
// console.log('oklch', oklch, Object.keys(oklch), formatHex(oklch))
// console.log('hslConverter', hslConverter('#f0f0f0'))
// console.log('hslConverter', hslConverter('oklch(0.75 0.15 231)'))
// console.log('oklchConverter', oklchConverter('#f0f0f0'))
// console.log('oklchConverter', oklchConverter('oklch(0.75 0.15 231)'))

const oklchStringToLchArray: TStringToStringArray = (strOklch: string): string[] => {
  const converted = oklchConverter(strOklch) as Oklch
  return [
    `${_round(converted.l ?? 0)}`,
    `${_round(converted.c ?? 0)}`,
    `${converted.h ?? 0}`,
    `${_round(converted.alpha ?? 1)}`
  ]
}

const oklchStringToHslArray: TStringToStringArray = (strOklch: string): string[] => {
  const converted = hslConverter(strOklch) as Hsl
  return [
    `${_round(converted.h ?? 0)}`,
    `${_round((converted.s ?? 0) * 100)}%`,
    `${_round((converted.l ?? 0) * 100)}%`,
    `${_round(converted.alpha ?? 1)}`
  ]
}

const convertHexValue: TConvertHexValue = (
  hexValue: string,
  useOkLch: boolean
): string[] => {
  if (useOkLch) {
    // use oklch:

    // use colorjs:
    // const value = new ColorJSIO(hexValue).to('oklch')
    // const valueArr = value.toString().replace('oklch(', '').replace(')', '').split(/\s/)
    // console.log('convertHexValue: oklch', hexValue, value.toString(), valueArr)
    // [l,c,h]
    //return valueArr

    // use culori:
    const converted = oklchConverter(hexValue) as Oklch
    return [
      `${_round(converted.l ?? 0)}`,
      `${_round(converted.c ?? 0)}`,
      `${_round(converted.h ?? 0)}`,
      `${_round(converted.alpha ?? 1)}`
    ]
  } else {
    // use hsl:

    // use colorjs:
    // const value = new ColorJSIO(hexValue).to('hsl')
    // // value.hsl would return an awway, but would not include the % sign,
    // // so we would rather use value.toString() and parse the returned value here:
    // const valueArr = value.toString().replace('hsl(', '').replace(')', '').split(/\s/)
    // // console.log('convertHexValue: hsl', hexValue, value.toString(), valueArr)
    // [h,s,l]
    // return valueArr

    // use culori:
    const converted = hslConverter(hexValue) as Hsl
    return [
      `${_round(converted.h ?? 0)}`,
      `${_round((converted.s ?? 0) * 100)}%`,
      `${_round((converted.l ?? 0) * 100)}%`,
      `${_round(converted.alpha ?? 1)}`
    ]
  }
}

const _round = (value: number) => {
  return Number(value.toFixed(2))
}

const oklchStringFromHex = (hexValue: string): string => {
  const converted = oklchConverter(hexValue) as Oklch
  return `oklch(${_round(converted.l ?? 0)} ${_round(converted.c ?? 0)} ${_round(converted.h ?? 0)} / 1)`
}

interface IUseColorConvertion {
  convertHexValue: TConvertHexValue
  oklchStringFromHex: TOklchStringFromHex
  oklchStringToLchArray: TStringToStringArray
  oklchStringToHslArray: TStringToStringArray
}

export const useColorConversion = (): IUseColorConvertion => {
  return {
    convertHexValue,
    oklchStringFromHex,
    oklchStringToLchArray,
    oklchStringToHslArray
  }
}
