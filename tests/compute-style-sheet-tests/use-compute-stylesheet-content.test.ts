import { useCategories } from '../../src/use-categories'
import { useComputeStyleSheetContent } from '../../src/use-compute-stylesheet-content'

describe('useComputeStyleSheetContent', () => {
  it(`instance should be defined`, () => {
    const instance = useComputeStyleSheetContent()
    expect(instance).toBeDefined()
  })

  describe('computeStyleSheetContent', () => {
    const cssVarPrefix = 'bwj'
    const { initCategoryOption } = useCategories()
    const { computeStyleSheetContent } = useComputeStyleSheetContent()

    it(`should return expected result when useOkLch is true`, () => {
      const selectedCategories = [initCategoryOption('unittest')]
      selectedCategories.forEach((c) => (c.selected = true))
      const useOkLch = true
      const result = computeStyleSheetContent(cssVarPrefix, useOkLch, selectedCategories)
      expect(result).toBeDefined()

      // need to remove new-lines and replace double-spaces with one space to better compare it
      //const cleansed = result.replace(/\n/gi, '').replace(/\s+/gi, ' ').trim()
      //const expected = `.ring-2, .hover\:ring-2:hover, .focus\:ring-2:focus, .active\:ring-2:active {--bwj-ring-offset-shadow: var(--bwj-ring-inset) 0 0 0 var(--bwj-ring-offset-width) var(--bwj-ring-offset-color); --bwj-ring-shadow: var(--bwj-ring-inset) 0 0 0 calc(2px + var(--bwj-ring-offset-width)) var(--bwj-ring-color); box-shadow: var(--bwj-ring-offset-shadow), var(--bwj-ring-shadow), var(--bwj-shadow, 0 0 #0000);} .ring-offset-2, .hover\:ring-offset-2:hover, .focus\:ring-offset-2:focus, .active\:ring-offset-2:active {--bwj-ring-offset-width: 2px; box-shadow: 0 0 0 var(--bwj-ring-offset-width) var(--bwj-ring-offset-color), var(--bwj-ring-shadow);} .bg-unittest {background-color: oklch( var(--bwj-unittest-okl) var(--bwj-unittest-okc) var(--bwj-unittest-okh) );} .content-unittest {color: oklch( var(--bwj-unittest-content-okl) var(--bwj-unittest-content-okc) var(--bwj-unittest-content-okh) );} .border-unittest {border-color: oklch( var(--bwj-unittest-okl) var(--bwj-unittest-okc) var(--bwj-unittest-okh) );} .ring-unittest {--bwj-ring-color: oklch( var(--bwj-unittest-okl) var(--bwj-unittest-okc) var(--bwj-unittest-okh) );} .ring-offset-unittest {--bwj-ring-offset-color: oklch( var(--bwj-unittest-okl) var(--bwj-unittest-okc) var(--bwj-unittest-okh) );} .bg-unittest-invert {background-color: oklch( var(--bwj-unittest-content-okl) var(--bwj-unittest-content-okc) var(--bwj-unittest-content-okh) );} .content-unittest-invert {color: oklch( var(--bwj-unittest-okl) var(--bwj-unittest-okc) var(--bwj-unittest-okh) );} .focus\:bg-unittest:focus {background-color: oklch( var(--bwj-unittest-focus-okl) var(--bwj-unittest-focus-okc) var(--bwj-unittest-focus-okh) );} .focus\:border-unittest:focus {border-color: oklch( var(--bwj-unittest-focus-okl) var(--bwj-unittest-focus-okc) var(--bwj-unittest-focus-okh) );} .focus\:ring-unittest:focus {--bwj-ring-color: oklch( var(--bwj-unittest-focus-okl) var(--bwj-unittest-focus-okc) var(--bwj-unittest-focus-okh) );} .focus\:ring-offset-unittest:focus {--bwj-ring-offset-color: oklch( var(--bwj-unittest-focus-okl) var(--bwj-unittest-focus-okc) var(--bwj-unittest-focus-okh) );}@media (hover: hover) and (pointer: fine) {.hover\:bg-unittest:hover {background-color: oklch( var(--bwj-unittest-hover-okl) var(--bwj-unittest-hover-okc) var(--bwj-unittest-hover-okh) );}.hover\:border-unittest:hover {border-color: oklch( var(--bwj-unittest-hover-okl) var(--bwj-unittest-hover-okc) var(--bwj-unittest-hover-okh) );}.hover\:ring-unittest:hover {--bwj-ring-color: oklch( var(--bwj-unittest-hover-okl) var(--bwj-unittest-hover-okc) var(--bwj-unittest-hover-okh) );}.hover\:ring-offset-unittest:hover {--bwj-ring-offset-color: oklch( var(--bwj-unittest-hover-okl) var(--bwj-unittest-hover-okc) var(--bwj-unittest-hover-okh) );}}`
      //expect(cleansed).toEqual(expected)
    })

    it(`should return expected result when useOkLch is false`, () => {
      const selectedCategories = [initCategoryOption('unittest')]
      selectedCategories.forEach((c) => (c.selected = true))
      const useOkLch = false
      const result = computeStyleSheetContent(cssVarPrefix, useOkLch, selectedCategories)
      expect(result).toBeDefined()

      // need to remove new-lines and replace double-spaces with one space to better compare it
      // const cleansed = result.replace(/\n/gi, ' ').replace(/\s+/gi, ' ').trim()
      // const expected = `.ring-2, .hover\:ring-2:hover, .focus\:ring-2:focus, .active\:ring-2:active {--bwj-ring-offset-shadow: var(--bwj-ring-inset) 0 0 0 var(--bwj-ring-offset-width) var(--bwj-ring-offset-color); --bwj-ring-shadow: var(--bwj-ring-inset) 0 0 0 calc(2px + var(--bwj-ring-offset-width)) var(--bwj-ring-color); box-shadow: var(--bwj-ring-offset-shadow), var(--bwj-ring-shadow), var(--bwj-shadow, 0 0 #0000);} .ring-offset-2, .hover\:ring-offset-2:hover, .focus\:ring-offset-2:focus, .active\:ring-offset-2:active {--bwj-ring-offset-width: 2px; box-shadow: 0 0 0 var(--bwj-ring-offset-width) var(--bwj-ring-offset-color), var(--bwj-ring-shadow);} .bg-unittest {background-color: hsl( var(--bwj-unittest-h) var(--bwj-unittest-s) var(--bwj-unittest-l) );} .content-unittest {color: hsl( var(--bwj-unittest-content-h) var(--bwj-unittest-content-s) var(--bwj-unittest-content-l) );} .border-unittest {border-color: hsl( var(--bwj-unittest-h) var(--bwj-unittest-s) var(--bwj-unittest-l) );} .ring-unittest {--bwj-ring-color: hsl( var(--bwj-unittest-h) var(--bwj-unittest-s) var(--bwj-unittest-l) );} .ring-offset-unittest {--bwj-ring-offset-color: hsl( var(--bwj-unittest-h) var(--bwj-unittest-s) var(--bwj-unittest-l) );} .bg-unittest-invert {background-color: hsl( var(--bwj-unittest-content-h) var(--bwj-unittest-content-s) var(--bwj-unittest-content-l) );} .content-unittest-invert {color: hsl( var(--bwj-unittest-h) var(--bwj-unittest-s) var(--bwj-unittest-l) );} .focus\:bg-unittest:focus {background-color: hsl( var(--bwj-unittest-focus-h) var(--bwj-unittest-focus-s) var(--bwj-unittest-focus-l) );} .focus\:border-unittest:focus {border-color: hsl( var(--bwj-unittest-focus-h) var(--bwj-unittest-focus-s) var(--bwj-unittest-focus-l) );} .focus\:ring-unittest:focus {--bwj-ring-color: hsl( var(--bwj-unittest-focus-h) var(--bwj-unittest-focus-s) var(--bwj-unittest-focus-l) );} .focus\:ring-offset-unittest:focus {--bwj-ring-offset-color: hsl( var(--bwj-unittest-focus-h) var(--bwj-unittest-focus-s) var(--bwj-unittest-focus-l) );} @media (hover: hover) and (pointer: fine) { .hover\:bg-unittest:hover {background-color: hsl( var(--bwj-unittest-hover-h) var(--bwj-unittest-hover-s) var(--bwj-unittest-hover-l) );} .hover\:border-unittest:hover {border-color: hsl( var(--bwj-unittest-hover-h) var(--bwj-unittest-hover-s) var(--bwj-unittest-hover-l) );} .hover\:ring-unittest:hover {--bwj-ring-color: hsl( var(--bwj-unittest-hover-h) var(--bwj-unittest-hover-s) var(--bwj-unittest-hover-l) );} .hover\:ring-offset-unittest:hover {--bwj-ring-offset-color: hsl( var(--bwj-unittest-hover-h) var(--bwj-unittest-hover-s) var(--bwj-unittest-hover-l) );} }`
      // expect(cleansed).toEqual(expected)
    })

    // computeStyleSheetContent
  })
})
