import { useCategories } from '../../categories'

describe('useCategories', () => {
  it(`should return instance`, () => {
    const instance = useCategories()
    expect(instance).toBeDefined()
  })

  describe('getInitialCategoryOptions', () => {

    it(`should return initial cateogry options`, () => {
      const results = useCategories().getInitialCategoryOptions()
      expect(results).toBeDefined()
      expect(results).toHaveLength(12)
    })

  })

  describe('initCategoryOption', () => {

    const {
      initCategoryOption
    } = useCategories()

    it(`should return an instance of a new ICategoryOption`, () => {
      const result = initCategoryOption('test')
      expect(result).toBeDefined()
      expect(result.id).toEqual('test')
      expect(result.hasHover).toEqual(true)
      expect(result.hasFocus).toEqual(true)
      expect(result.selected).toEqual(false)
      expect(result.hexValue).toEqual('#ff9900')
      expect(result.hoverHex).toEqual('#ffff00')
      expect(result.focusHex).toEqual('#ffff00')
      expect(result.contentHex).toEqual('#000000')
    })

  })

  describe('updateCategoryHex', () => {

    const {
      initCategoryOption,
      updateCategoryHex
    } = useCategories()

    it(`should set the category hexValue value as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#ab37a1'
      const result = updateCategoryHex(category, value)
      expect(result).toBeDefined()
      expect(result.hexValue).toEqual(value)
    })

    it(`should set the category contentHex value as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#ab37a1'
      const result = updateCategoryHex(category, value, 'content')
      expect(result).toBeDefined()
      expect(result.contentHex).toEqual(value)
    })

    it(`should set the category hoverHex value as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#de98cc'
      const result = updateCategoryHex(category, value, 'hover')
      expect(result).toBeDefined()
      expect(result.hoverHex).toEqual(value)
    })

    it(`should set the category focusHex value as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#de98cc'
      const result = updateCategoryHex(category, value, 'focus')
      expect(result).toBeDefined()
      expect(result.focusHex).toEqual(value)
    })

  })
})
