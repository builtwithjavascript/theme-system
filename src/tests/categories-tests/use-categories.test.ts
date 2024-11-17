import { useCategories } from '../../hooks/use-categories'

describe('useCategories', () => {
  it(`should return instance`, () => {
    const instance = useCategories()
    expect(instance).toBeDefined()
  })

  describe('getInitialCategoryOptions', () => {
    it(`should return initial cateogry options`, () => {
      const results = useCategories().getInitialCategoryOptions()
      expect(results).toBeDefined()
      expect(results).toHaveLength(13)
    })
  })

  describe('initCategoryOption', () => {
    const { initCategoryOption } = useCategories()

    it(`should return an instance of a new ICategoryOption`, () => {
      const result = initCategoryOption('test', {
        hasHover: true,
        hasFocus: true
      })
      expect(result).toBeDefined()
      expect(result.id).toEqual('test')
      expect(result.hasHover).toEqual(true)
      expect(result.hasFocus).toEqual(true)
      expect(result.selected).toEqual(true)
      expect(result._hex).toEqual('#ff3fd0')
      expect(result._hoverHex).toEqual('#ff3fd0')
      expect(result._focusHex).toEqual('#ff3fd0')
      expect(result.oklch).toEqual('oklch(0.7 0.27 340 / 1)')
      expect(result.hoverOklch).toEqual('oklch(0.7 0.32 340 / 1)')
      expect(result.focusOklch).toEqual('oklch(0.7 0.32 340 / 1)')
      expect(result.contentOklch).toEqual('oklch(1 0 0 / 1)')
    })
  })

  describe('updateCategoryFieldsFromHex', () => {
    const { initCategoryOption, updateCategoryFieldsFromHex } = useCategories()

    it(`should set the category color fields values as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#ab37a1'
      const result = updateCategoryFieldsFromHex(category, value)
      expect(result).toBeDefined()
      expect(result._hex).toEqual(value)
    })

    it(`should set the category content color values as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#ab37a1'
      const result = updateCategoryFieldsFromHex(category, value, 'content')
      expect(result).toBeDefined()
      expect(result._contentHex).toEqual(value)
    })

    it(`should set the category color hover values as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#de98cc'
      const result = updateCategoryFieldsFromHex(category, value, 'hover')
      expect(result).toBeDefined()
      expect(result._hoverHex).toEqual(value)
    })

    it(`should set the category color focus values as expected`, () => {
      const category = initCategoryOption('test')
      const value = '#de98cc'
      const result = updateCategoryFieldsFromHex(category, value, 'focus')
      expect(result).toBeDefined()
      expect(result._focusHex).toEqual(value)
    })
  })

  describe('validateCategoryName', () => {
    const { getInitialCategoryOptions, validateCategoryName } = useCategories()
    const existingCategories = getInitialCategoryOptions()

    describe('adding new category', () => {
      const { initCategoryOption } = useCategories()
      const newCategory = initCategoryOption('test')

      it(`should return a blank error message when category name is valid`, () => {
        const result = validateCategoryName(
          existingCategories,
          newCategory.uniqueId,
          'newcategory'
        )
        expect(result).toHaveLength(0)
      })

      it(`should return a blank error message when category name contains characters that are not allowed`, () => {
        const result = validateCategoryName(
          existingCategories,
          newCategory.uniqueId,
          '_asd'
        )
        expect(result).toEqual('Name can only contain characters from "a" to "z".')
      })

      it(`should return a blank error message when category name is too short`, () => {
        const result = validateCategoryName(existingCategories, newCategory.uniqueId, 'a')
        expect(result).toEqual('Name must be between 3 and 20 characters.')
      })

      it(`should return a blank error message when category name is too long`, () => {
        const result = validateCategoryName(
          existingCategories,
          newCategory.uniqueId,
          Array(30).join('a')
        )
        expect(result).toEqual('Name must be between 3 and 20 characters.')
      })
    })

    describe('updating existing category', () => {
      it(`should return a blank error message when category name is valid`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(
          existingCategories,
          category.uniqueId,
          'newcategory'
        )
        expect(result).toHaveLength(0)
      })

      it(`should return ta blank error message when category name has not changed`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(
          existingCategories,
          category.uniqueId,
          'primary'
        )
        expect(result).toHaveLength(0)
      })

      it(`should return the expected error message when category name is in use by another category`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(
          existingCategories,
          category.uniqueId,
          'secondary'
        )
        expect(result).toEqual('Name is already in use.')
      })

      it(`should return an error message when category name contains characters that are not allowed`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(existingCategories, category.uniqueId, '_asd')
        expect(result).toEqual('Name can only contain characters from "a" to "z".')
      })

      it(`should return an error message when category name is too short`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(existingCategories, category.uniqueId, 'a')
        expect(result).toEqual('Name must be between 3 and 20 characters.')
      })

      it(`should return the expected error message when category name is too long`, () => {
        const category = existingCategories[0]
        const result = validateCategoryName(
          existingCategories,
          category.uniqueId,
          Array(30).join('a')
        )
        expect(result).toEqual('Name must be between 3 and 20 characters.')
      })
    })
  })
})
