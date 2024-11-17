import type { ICategoryOption } from './shared'
import { useCategories } from './use-categories'
import { useComputeStyleSheetContent } from './use-compute-stylesheet-content'
import { useUpdateHeadStyle } from './use-update-headstyle'
import { useUpdateDocumentStyleProp } from './use-update-document-style-prop'

export * from './shared'
export * from './use-categories'
export * from './use-color-conversion'
export * from './use-compute-stylesheet-content'
export * from './use-css-vars-utils'
export * from './use-scrollbar-style'
export * from './use-update-document-style-prop'
export * from './use-update-headstyle'

const { getInitialCategoryOptions } = useCategories()
const { computeStyleSheetContent } = useComputeStyleSheetContent()
const { updateHeadStyle } = useUpdateHeadStyle()
const { updateDocumentStyleProp } = useUpdateDocumentStyleProp()

const _computeDocumentStyles = async (
  cssVarPrefix?: string,
  categories?: ICategoryOption[],
  useOkLch?: boolean
): Promise<void> => {
  cssVarPrefix = cssVarPrefix || 'bwj'
  useOkLch = useOkLch || true
  if (!categories) {
    categories = getInitialCategoryOptions()
  }
  const selectedCategories = categories.filter((c) => c.selected)

  // reset existing ones
  const currentOnes = Object.values(document.documentElement.style)
  currentOnes.forEach((v) => {
    document.documentElement.style.removeProperty(v)
  })

  const styleSheetContent = computeStyleSheetContent(
    cssVarPrefix,
    useOkLch,
    selectedCategories
  )
  updateHeadStyle(styleSheetContent)

  selectedCategories.forEach((item) => {
    // they all have bg- and content-:
    // this._updateCssVariableValue(item, item.hexValue as string)
    // this._updateCssVariableValue(item, item.contentHex as string, 'content')
    updateDocumentStyleProp(cssVarPrefix, useOkLch, item.id, item.oklch)
    updateDocumentStyleProp(cssVarPrefix, useOkLch, item.id, item.contentOklch, 'content')

    // // they all have bg-[category]-invert and content-[category]-invert
    // // invert: use content color for bg-[category]-invert
    // _updateCssVariableValue(item, item.contentHex as string, 'invert')
    // // invert: use bg color for content-[category]-invert
    // _updateCssVariableValue(item, item.hexValue as string, 'content-invert')

    if (item.hasHover) {
      // this._updateCssVariableValue(item, item.hoverHex as string, 'hover')
      updateDocumentStyleProp(
        cssVarPrefix,
        useOkLch,
        item.id,
        `${item.hoverOklch}`,
        'hover'
      )
    }
    if (item.hasFocus) {
      // this._updateCssVariableValue(item, item.focusHex as string, 'focus')
      updateDocumentStyleProp(
        cssVarPrefix,
        useOkLch,
        item.id,
        `${item.focusOklch}`,
        'focus'
      )
    }
  })
}

export type TSupportedColorSpaces = 'hsl' | 'oklch'

export const useThemeSystem = () => {
  return {
    computeDocumentStyles: _computeDocumentStyles
  }
}
