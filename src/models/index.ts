export interface ICategoryOption {
  id: string
  hasHover: boolean
  hasFocus: boolean

  hexValue: string
  hoverHex?: string
  focusHex?: string
  contentHex: string

  selected: boolean
}

export type TInitCategoryOption = (id: string) => ICategoryOption

export type TUpdateCategoryHex = (
  category: ICategoryOption,
  hexValue: string,
  state?: string
) => ICategoryOption

export type TConvertHexValue = (hexValue: string, useOkLch: boolean) => string[]

export type TUpdateDocumentStyleProp = (
  cssVarPrefix: string,
  useOkLch: boolean,
  key: string,
  hexValue: string,
  state?: string
) => void

export type TComputeStyleSheetContent = (
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[]
) => string
