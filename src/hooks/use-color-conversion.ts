import { converter, formatHex, parse } from 'culori'
import type { Oklch, Hsl } from 'culori'
import type {
  TStringToStringArray,
  TConvertHexValue,
  TOklchStringFromHex,
  THexStringFromOklchString
} from '../models'

const oklchConverter = converter('oklch')
const hslConverter = converter('hsl')

// let oklch: Oklch = { c: 0.11, h: 150, l: 0.57, mode: 'oklch' }
// _logger.log('oklch', oklch, Object.keys(oklch), formatHex(oklch))
// _logger.log('hslConverter', hslConverter('#f0f0f0'))
// _logger.log('hslConverter', hslConverter('oklch(0.75 0.15 231)'))
// _logger.log('oklchConverter', oklchConverter('#f0f0f0'))
// _logger.log('oklchConverter', oklchConverter('oklch(0.75 0.15 231)'))

const oklchStringToLchArray: TStringToStringArray = (strOklch: string): string[] => {
  if (typeof strOklch === undefined || `${strOklch}`.trim().length < 1) {
    console.warn(`oklchStringToLchArray: invalid param strOklch: "${strOklch}"`)
  }
  const converted = oklchConverter(strOklch) as Oklch
  return [
    `${_round(converted?.l ?? 0)}`,
    `${_round(converted?.c ?? 0)}`,
    `${_round(converted?.h ?? 0)}`,
    `${_round(converted?.alpha ?? 1)}`
  ]
}

const oklchStringToHslArray: TStringToStringArray = (strOklch: string): string[] => {
  if (typeof strOklch === undefined || `${strOklch}`.trim().length < 1) {
    console.warn(`oklchStringToHslArray: invalid param strOklch: "${strOklch}"`)
  }
  const converted = hslConverter(strOklch) as Hsl
  return [
    `${_round(converted?.h ?? 0)}`,
    `${_round((converted?.s ?? 0) * 100)}%`,
    `${_round((converted?.l ?? 0) * 100)}%`,
    `${_round(converted?.alpha ?? 1)}`
  ]
}

const convertHexValue: TConvertHexValue = (
  hexValue: string,
  useOkLch: boolean
): string[] => {
  if (typeof hexValue === undefined || `${hexValue}`.trim().length < 1) {
    console.warn(`convertHexValue: invalid param hexValue: "${hexValue}"`)
  }

  if (useOkLch) {
    // use oklch:

    // use colorjs:
    // const value = new ColorJSIO(hexValue).to('oklch')
    // const valueArr = value.toString().replace('oklch(', '').replace(')', '').split(/\s/)
    // _logger.log('convertHexValue: oklch', hexValue, value.toString(), valueArr)
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
    // // _logger.log('convertHexValue: hsl', hexValue, value.toString(), valueArr)
    // [h,s,l]
    // return valueArr

    // use culori:
    const converted = hslConverter(hexValue) as Hsl
    return [
      `${_round(converted?.h ?? 0)}`,
      `${_round((converted?.s ?? 0) * 100)}%`,
      `${_round((converted?.l ?? 0) * 100)}%`,
      `${_round(converted?.alpha ?? 1)}`
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

const hexStringFromOklchString = (input: string) => {
  if ((input || '').trim().length < 7) {
    return ''
  }
  return `${formatHex(parse(input))}`
}

interface IUseColorConvertion {
  convertHexValue: TConvertHexValue
  oklchStringFromHex: TOklchStringFromHex
  oklchStringToLchArray: TStringToStringArray
  oklchStringToHslArray: TStringToStringArray
  hexStringFromOklchString: THexStringFromOklchString
}

export const useColorConversion = (): IUseColorConvertion => {
  return {
    convertHexValue,
    oklchStringFromHex,
    oklchStringToLchArray,
    oklchStringToHslArray,
    hexStringFromOklchString
  }
}
