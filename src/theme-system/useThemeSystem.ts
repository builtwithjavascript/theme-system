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
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[],
  updateCategoryHex: TUpdateCategoryHex,
  computeStyleSheetContent: TComputeStyleSheetContent,
  updateDocumentStyleProp: TUpdateDocumentStyleProp
) => {
  const styleSheetContent = computeStyleSheetContent(cssVarPrefix, useOkLch, selectedCategories)

  const styleElementId = 'bwj-themesystem'
  let elStyle = document.getElementById(styleElementId)
  // console.log('updateHeadStyle existing elStyle', elStyle)
  if (!elStyle) {
    elStyle = document.createElement('style')
    elStyle.id = styleElementId
    // @ts-ignore
    elStyle.type = 'text/css'
    elStyle.innerHTML = styleSheetContent
    document.getElementsByTagName('head')[0].appendChild(elStyle)
  } else {
    elStyle.innerHTML = styleSheetContent
  }

  const _updateCssVariableValue = (
    category: ICategoryOption,
    hexValue: string,
    state?: string
  ) => {
    // update document style prop
    updateDocumentStyleProp(cssVarPrefix, useOkLch, category.id, hexValue, state)

    // update category
    updateCategoryHex(category, hexValue, state)
  }

  selectedCategories.forEach((item) => {
    // they all have bg- and content-:
    _updateCssVariableValue(item, item.hexValue as string)
    _updateCssVariableValue(item, item.contentHex as string, 'content')

    // // they all have bg-[category]-invert and content-[category]-invert
    // // invert: use content color for bg-[category]-invert
    // _updateCssVariableValue(item, item.contentHex as string, 'invert')
    // // invert: use bg color for content-[category]-invert
    // _updateCssVariableValue(item, item.hexValue as string, 'content-invert')

    if (item.hasHover) {
      _updateCssVariableValue(item, item.hoverHex as string, 'hover')
    }
    if (item.hasFocus) {
      _updateCssVariableValue(item, item.focusHex as string, 'focus')
    }
  })
}

export const useThemeSystem = (cssVarPrefix: string, colorSpace: 'hsl' | 'oklch') => {

  // TODO: cssVarPrefix and colorSpace params are not used

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
