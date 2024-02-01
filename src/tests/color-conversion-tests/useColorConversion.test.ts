import { useColorConversion } from '../../color-conversion'

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
      expect(result).toHaveLength(3)
      expect(result).toEqual(['36', '100%', '50%'])
    })

    it(`should return expected value when useOkLch is true`, () => {
      const result = convertHexValue('#ff9900', true)
      expect(result).toBeDefined()
      expect(result).toHaveLength(3)
      expect(result).toEqual(['0.772', '0.1738', '64.552'])
    })
    
  })
})
