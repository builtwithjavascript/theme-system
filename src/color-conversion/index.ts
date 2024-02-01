import ColorJSIO from 'colorjs.io'
import type { TConvertHexValue } from '../models'

const convertHexValue: TConvertHexValue = (
  hexValue: string,
  useOkLch: boolean
): string[] => {
  if (useOkLch) {
    const value = new ColorJSIO(hexValue).to('oklch')
    const valueArr = value.toString().replace('oklch(', '').replace(')', '').split(/\s/)
    // console.log('convertHexValue: oklch', hexValue, value.toString(), valueArr)
    // [l,c,h]
    return valueArr
  } else {
    // use hsl
    const value = new ColorJSIO(hexValue).to('hsl')
    // value.hsl would return an awway, but would not include the % sign,
    // so we would rather use value.toString() and parse the returned value here:
    const valueArr = value.toString().replace('hsl(', '').replace(')', '').split(/\s/)
    // console.log('convertHexValue: hsl', hexValue, value.toString(), valueArr)
    return valueArr
  }
}

interface IUseColorConvertion {
  convertHexValue: TConvertHexValue
}

export const useColorConversion = (): IUseColorConvertion => {
  return {
    convertHexValue
  }
}
