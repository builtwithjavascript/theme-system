export interface ICategoryOption {
  uniqueId: string
  id: string
  hasHover: boolean
  hasFocus: boolean

  // need hex fields to bind to <input type="color">
  _hex: string
  _hoverHex?: string
  _focusHex?: string
  _contentHex: string

  oklch: string
  hoverOklch?: string
  focusOklch?: string
  contentOklch: string

  selected: boolean
  flash: boolean
  _initial?: ICategoryOption | undefined
}

export type TInitCategoryOption = (
  id: string,
  options?: {
    hasHover: boolean
    hasFocus: boolean
  }
) => ICategoryOption

export type TUpdateCategoryHex = (
  category: ICategoryOption,
  strHex: string,
  state?: string
) => ICategoryOption

export type TValidateCategoryName = (
  categories: ICategoryOption[],
  uniqueId: string,
  newName: string
) => string

export type TStringToStringArray = (value: string) => string[]
export type TConvertHexValue = (strHex: string, useOkLch: boolean) => string[]
export type TOklchStringFromHex = (strHex: string) => string
export type THexStringFromOklchString = (strOklch: string) => string

export type TUpdateDocumentStyleProp = (
  cssVarPrefix: string,
  useOkLch: boolean,
  key: string,
  strOklch: string,
  state?: string
) => void

export type TComputeStyleSheetContent = (
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[]
) => string
