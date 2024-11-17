import { useColorConversion } from '../../hooks/use-color-conversion'

describe('useColorConversion', () => {
  it(`instance should be defined`, () => {
    const instance = useColorConversion()
    expect(instance).toBeDefined()
  })

  describe('convertHexValue', () => {
    const { convertHexValue } = useColorConversion()

    it(`should return expected value when useOkLch is false`, () => {
      const result = convertHexValue('#ff9900', false)
      expect(result).toBeDefined()
      expect(result).toHaveLength(4)
      expect(result).toEqual(['36', '100%', '50%', '1'])
    })

    it(`should return expected value when useOkLch is true`, () => {
      const result = convertHexValue('#ff9900', true)
      expect(result).toBeDefined()
      expect(result).toHaveLength(4)
      expect(result).toEqual(['0.77', '0.17', '64.55', '1'])
    })
  })

  describe('oklchStringFromHex', () => {
    const { oklchStringFromHex } = useColorConversion()

    it(`should return expected value`, () => {
      const result = oklchStringFromHex('#ff9900')
      expect(result).toBeDefined()
      expect(result).toEqual('oklch(0.77 0.17 64.55 / 1)')
    })
  })

  describe('oklchStringToLchArray', () => {
    const { oklchStringToLchArray } = useColorConversion()

    it(`should return expected value`, () => {
      const result = oklchStringToLchArray('oklch(0.77 0.17 64.55 / 1)')
      expect(result).toBeDefined()
      expect(result).toEqual(['0.77', '0.17', '64.55', '1'])
    })
  })

  describe('oklchStringToHslArray', () => {
    const { oklchStringToHslArray } = useColorConversion()

    it(`should return expected value`, () => {
      const result = oklchStringToHslArray('oklch(0.77 0.17 64.55 / 1)')
      expect(result).toBeDefined()
      expect(result).toEqual(['34.51', '98.2%', '53.18%', '1'])
    })
  })
})
