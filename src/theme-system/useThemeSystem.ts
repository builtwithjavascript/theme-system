// file: src/theme-system/useThemeSystem.ts

import type {
  ICategoryOption,
  TUpdateCategoryHex,
  TComputeStyleSheetContent,
  TUpdateDocumentStyleProp
} from '../models'
import { useCategories } from '../categories'
import { useStyleSheetUtils } from '../style-sheet'

const updateHeadStyle = (
  selectedCategories: ICategoryOption[],
  useOkLch: boolean,
  updateCategoryHex: TUpdateCategoryHex,
  computeStyleSheetContent: TComputeStyleSheetContent,
  updateDocumentStyleProp: TUpdateDocumentStyleProp
) => {
  const styleSheetContent = computeStyleSheetContent(selectedCategories, useOkLch)

  let elStyle = document.getElementById('wpt')
  // console.log('updateHeadStyle existing elStyle', elStyle)
  if (!elStyle) {
    elStyle = document.createElement('style')
    elStyle.id = 'wpt'
    // @ts-ignore
    elStyle.type = 'text/css'
    elStyle.innerHTML = styleSheetContent
    document.getElementsByTagName('head')[0].appendChild(elStyle)
  } else {
    elStyle.innerHTML = styleSheetContent
  }

  const updateCssVariableValue = (
    useOkLch: boolean,
    category: ICategoryOption,
    hexValue: string,
    state?: string
  ) => {
    // update document style prop
    updateDocumentStyleProp(useOkLch, category.id, hexValue, state)

    // update category
    updateCategoryHex(category, hexValue, state)
  }

  selectedCategories.forEach((item) => {
    // they all have bg- and content-:
    updateCssVariableValue(useOkLch, item, item.hexValue as string)
    updateCssVariableValue(useOkLch, item, item.contentHex as string, 'content')

    // // they all have bg-[category]-invert and content-[category]-invert
    // // invert: use content color for bg-[category]-invert
    // updateCssVariableValue(useOkLch, item, item.contentHex as string, 'invert')
    // // invert: use bg color for content-[category]-invert
    // updateCssVariableValue(useOkLch, item, item.hexValue as string, 'content-invert')

    if (item.hasHover) {
      updateCssVariableValue(useOkLch, item, item.hoverHex as string, 'hover')
    }
    if (item.hasFocus) {
      updateCssVariableValue(useOkLch, item, item.focusHex as string, 'focus')
    }
  })
}

export const useThemeSystem = (cssVarPrefix: string, colorSpace: 'hsl' | 'oklch') => {
  const { getInitialCategoryOptions, updateCategoryHex } = useCategories()

  const { computeStyleSheetContent, updateDocumentStyleProp } = useStyleSheetUtils()

  return {
    cssVarPrefix,
    colorSpace,

    // categories
    getInitialCategoryOptions,
    updateCategoryHex,

    // stylesheet
    computeStyleSheetContent,
    updateDocumentStyleProp,
    updateHeadStyle
  }
}
