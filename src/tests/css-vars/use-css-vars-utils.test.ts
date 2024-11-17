import { useCssVarsUtils } from '../../hooks/use-css-vars-utils'

describe('useCssVarsUtils', () => {
  it(`instance should be defined`, () => {
    const instance = useCssVarsUtils()
    expect(instance).toBeDefined()
  })

  describe('buildCssAttributeColorExpression: no opacityValue parameter provided', () => {
    const cssVarPrefix = 'bwj'
    const { buildCssAttributeColorExpression } = useCssVarsUtils()

    it(`should return expected value when useOkLch is true`, () => {
      const useOkLch = true
      const categoryId = 'primary'
      const expected = `oklch(var(--bwj-primary-okl) var(--bwj-primary-okc) var(--bwj-primary-okh))`
      const result = buildCssAttributeColorExpression(cssVarPrefix, useOkLch, categoryId)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })

    it(`should return expected value when useOkLch is false`, () => {
      const useOkLch = false
      const categoryId = 'primary'
      const expected = `hsl(var(--bwj-primary-h) var(--bwj-primary-s) var(--bwj-primary-l))`
      const result = buildCssAttributeColorExpression(cssVarPrefix, useOkLch, categoryId)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
  })
})
