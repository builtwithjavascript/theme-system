import type { TKeyValue, ICategoryOption } from '../shared'

import { useColorConversion } from '../use-color-conversion'
import { useCssVarsUtils } from '../use-css-vars-utils'
const { defaultCssVarsKeyValues } = useCssVarsUtils()

// use this commented out code only to genered the initial categories
// import { oklchCategories } from './oklchCategories'
// _logger.log('oklchCategories')
// _logger.log(JSON.stringify(oklchCategories, null, 2))

export const _uniqueId = (): string => {
  let ms: string = '' + new Date().getTime()
  if (ms.length < 13) {
    ms = ms.padEnd(13, '0')
  }

  let str: string = `${Math.round(Math.random() * 1000000)}`.trim()

  if (str.length < 10) {
    str = str.padStart(10, '0')
  }

  return `${ms}${str}`
}

type TInitCategoryOption = (
  id: string,
  options?: {
    hasHover: boolean
    hasFocus: boolean
  }
) => ICategoryOption

type TUpdateCategoryHex = (
  category: ICategoryOption,
  strHex: string,
  state?: string
) => ICategoryOption

type TValidateCategoryName = (
  categories: ICategoryOption[],
  uniqueId: string,
  newName: string
) => string

const defaultCategories: ICategoryOption[] = [
  {
    uniqueId: _uniqueId(),
    id: 'primary',
    hasHover: true,
    hasFocus: true,
    _hex: '#00bfff',
    _hoverHex: '#3dc7f5',
    _focusHex: '#80dfff',
    _contentHex: '#ffffff',
    selected: true,
    flash: false,
    oklch: 'oklch(0.76 0.15 231.64 / 1)',
    contentOklch: 'oklch(1 0 0 / 1)',
    hoverOklch: 'oklch(0.78 0.13 225.15 / 1)',
    focusOklch: 'oklch(0.86 0.1 221.95 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'secondary',
    hasHover: true,
    hasFocus: true,
    _hex: '#f0fbff',
    _hoverHex: '#e0f7ff',
    _focusHex: '#d6f4ff',
    _contentHex: '#0095c7',
    selected: true,
    flash: false,
    oklch: 'oklch(0.98 0.01 221.42 / 1)',
    contentOklch: 'oklch(0.63 0.13 231.17 / 1)',
    hoverOklch: 'oklch(0.96 0.03 220.63 / 1)',
    focusOklch: 'oklch(0.95 0.03 221.88 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'accent',
    hasHover: true,
    hasFocus: true,
    _hex: '#fdf59b',
    _hoverHex: '#fcf178',
    _focusHex: '#fbeb37',
    _contentHex: '#000000',
    selected: true,
    flash: false,
    oklch: 'oklch(0.96 0.11 103.9 / 1)',
    contentOklch: 'oklch(0 0 0 / 1)',
    hoverOklch: 'oklch(0.94 0.14 104.07 / 1)',
    focusOklch: 'oklch(0.92 0.18 104.02 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'neutral',
    hasHover: true,
    hasFocus: true,
    _hex: '#f5f5f5',
    _hoverHex: '#fdfff5',
    _focusHex: '#ffffff',
    _contentHex: '#000000',
    selected: true,
    flash: false,
    oklch: 'oklch(0.97 0 0 / 1)',
    contentOklch: 'oklch(0 0 0 / 1)',
    hoverOklch: 'oklch(1 0.01 115.82 / 1)',
    focusOklch: 'oklch(1 0 0 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'disabled',
    hasHover: false,
    hasFocus: false,
    _hex: '#f2f2f2',
    _contentHex: '#8c8c8c',
    selected: true,
    flash: false,
    oklch: 'oklch(0.96 0 0 / 1)',
    contentOklch: 'oklch(0.64 0 0 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'info',
    hasHover: true,
    hasFocus: true,
    _hex: '#70b5ff',
    _hoverHex: '#5cabff',
    _focusHex: '#c2dfff',
    _contentHex: '#ffffff',
    selected: true,
    flash: false,
    oklch: 'oklch(0.76 0.13 251.4 / 1)',
    contentOklch: 'oklch(1 0 0 / 1)',
    hoverOklch: 'oklch(0.73 0.15 251.72 / 1)',
    focusOklch: 'oklch(0.89 0.05 250.99 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'success',
    hasHover: true,
    hasFocus: true,
    _hex: '#8cf28c',
    _hoverHex: '#a8f0a8',
    _focusHex: '#19e619',
    _contentHex: '#000000',
    selected: true,
    flash: false,
    oklch: 'oklch(0.87 0.17 143.98 / 1)',
    contentOklch: 'oklch(0 0 0 / 1)',
    hoverOklch: 'oklch(0.89 0.12 144.47 / 1)',
    focusOklch: 'oklch(0.8 0.27 142.58 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'warning',
    hasHover: true,
    hasFocus: true,
    _hex: '#ffc266',
    _hoverHex: '#f5a83d',
    _focusHex: '#fdb953',
    _contentHex: '#000000',
    selected: true,
    flash: false,
    oklch: 'oklch(0.85 0.13 75.72 / 1)',
    contentOklch: 'oklch(0 0 0 / 1)',
    hoverOklch: 'oklch(0.79 0.15 70.87 / 1)',
    focusOklch: 'oklch(0.83 0.14 74.52 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'danger',
    hasHover: true,
    hasFocus: true,
    _hex: '#ff6666',
    _hoverHex: '#f50000',
    _focusHex: '#f07575',
    _contentHex: '#ffffff',
    selected: true,
    flash: false,
    oklch: 'oklch(0.7 0.19 23.19 / 1)',
    contentOklch: 'oklch(1 0 0 / 1)',
    hoverOklch: 'oklch(0.61 0.25 29.23 / 1)',
    focusOklch: 'oklch(0.71 0.15 21.7 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'formfield',
    hasHover: true,
    hasFocus: true,
    _hex: 'eeeeee',
    _hoverHex: '#efefef',
    _focusHex: '#efefef',
    _contentHex: '#111111',
    selected: true,
    flash: false,
    oklch: 'oklch(0.9491 0 0 / 1)',
    contentOklch: 'oklch(0.1776 0 0 / 1)',
    hoverOklch: 'oklch(0.9521 0 0 / 1)',
    focusOklch: 'oklch(0.9521 0 0 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'body',
    hasHover: false,
    hasFocus: false,
    _hex: '#363636',
    _contentHex: '#efefef',
    selected: true,
    flash: false,
    oklch: 'oklch(0.33 0 0 / 1)',
    contentOklch: 'oklch(0.95 0 0 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'card',
    hasHover: false,
    hasFocus: false,
    _hex: '#dedede',
    _contentHex: '#333333',
    selected: true,
    flash: false,
    oklch: 'oklch(0.9 0 0 / 1)',
    contentOklch: 'oklch(0.32 0 0 / 1)'
  },
  {
    uniqueId: _uniqueId(),
    id: 'code',
    hasHover: false,
    hasFocus: false,
    _hex: '#3a3753',
    _contentHex: '#c2dcff',
    selected: true,
    flash: false,
    oklch: 'oklch(0.35 0.05 288.57 / 1)',
    contentOklch: 'oklch(0.89 0.06 255.89 / 1)'
  }
]

const initCategoryOption: TInitCategoryOption = (
  id: string,
  options?: {
    hasHover: boolean
    hasFocus: boolean
  }
): ICategoryOption => {
  const hasHover = options?.hasHover || false
  const hasFocus = options?.hasFocus || false
  return {
    uniqueId: _uniqueId(),
    id,
    hasHover,
    hasFocus,

    _hex: '#ff3fd0',
    _hoverHex: '#ff3fd0',
    _focusHex: '#ff3fd0',
    _contentHex: '#ffffff',

    oklch: 'oklch(0.7 0.27 340 / 1)',
    hoverOklch: 'oklch(0.7 0.32 340 / 1)',
    focusOklch: 'oklch(0.7 0.32 340 / 1)',
    contentOklch: 'oklch(1 0 0 / 1)',

    selected: true,
    flash: false
  }
}

const getInitialCategoryOptions = (): ICategoryOption[] => {
  // the different categories of our theme
  // (each match a group of css classes i.e. bg-primary, content-primary etc)

  const extractValueFromPair = (pair: TKeyValue<string> | undefined) => {
    return pair?.value || '0'
  }

  const extractOklchFromPairs = (pairs: TKeyValue<string>[]) => {
    if (pairs.length < 3) {
      return ''
    }
    const okl = `${extractValueFromPair(pairs.find((p) => p.key.endsWith('-okl')))}`
    const okc = `${extractValueFromPair(pairs.find((p) => p.key.endsWith('-okc')))}`
    const okh = `${extractValueFromPair(pairs.find((p) => p.key.endsWith('-okh')))}`
    return pairs.length > 0 ? `oklch(${okl} ${okc} ${okh})` : ''
  }

  const extractCategoryOption = (id: string): ICategoryOption => {
    const { hexStringFromOklchString } = useColorConversion()

    const categoryPairs = cssVarPairs.filter((p) => p.key.startsWith(id))
    const basePairs = categoryPairs.filter((p) => p.key.split('-').length === 2)
    const hoverPairs = categoryPairs.filter((p) => p.key.indexOf('-hover') > -1)
    const focusPairs = categoryPairs.filter((p) => p.key.indexOf('-focus') > -1)
    const contentPairs = categoryPairs.filter((p) => p.key.indexOf('-content') > -1)

    const hasHover = hoverPairs.length > 0
    const hasFocus = focusPairs.length > 0

    const oklch = extractOklchFromPairs(basePairs)
    const contentOklch = extractOklchFromPairs(contentPairs)
    let hoverOklch = ''
    let focusOklch = ''
    if (hasHover) {
      hoverOklch = extractOklchFromPairs(hoverPairs)
    }
    if (hasFocus) {
      focusOklch = extractOklchFromPairs(focusPairs)
    }

    return {
      uniqueId: _uniqueId(),
      id,
      hasHover,
      hasFocus,

      _hex: hexStringFromOklchString(oklch),
      _hoverHex: hasHover ? hexStringFromOklchString(hoverOklch) : '',
      _focusHex: hasFocus ? hexStringFromOklchString(focusOklch) : '',
      _contentHex: hexStringFromOklchString(contentOklch),

      oklch,
      hoverOklch,
      focusOklch,
      contentOklch,

      selected: true,
      flash: false
    }
  }

  const documentStyleSheets = [...(document.styleSheets as any)] as any
  const rootStyles = documentStyleSheets
    .flatMap((x: { rules: any }) => Object.values(x.rules))
    .filter((x: { selectorText: string }) => x.selectorText == ':root')
  if (rootStyles.length < 1) {
    return defaultCategories
  }

  // get key/value pairs for each css variable
  const cssVarPairs: TKeyValue<string>[] = `${rootStyles[0].cssText}`
    .replace(':root', '')
    .replace('{', '')
    .replace('}', '')
    .trim()
    .split(';')
    .map((t) => {
      let arr = `${t}`.split(':')
      return {
        key: `${arr[0]}`.replace('--bwj-', '').trim(),
        value: arr.length > 1 ? arr[1].trim() : '0'
      }
    })

  // NOTE: the following code is touchy so modify with care
  const excludeIds = new Set([
    ...defaultCssVarsKeyValues.map((x) =>
      `${x.key}`.trim().replace('--bwj-', '').split('-')[0].trim()
    ),
    'opacity'
  ])
  // get distinct category ids to exclude (i.e. opacity, shadow, etc):
  const distinctCssVarKeys = [
    ...new Set(cssVarPairs.map((c) => c.key.split('-')[0].trim()))
  ].filter((x) => x.length > 0)
  const categoryIds = distinctCssVarKeys.filter((id) => !excludeIds.has(id))
  if (categoryIds.length > 0) {
    const existing = categoryIds.map(extractCategoryOption)
    return existing
  } else {
    return defaultCategories
  }
}

const updateCategoryFieldsFromHex: TUpdateCategoryHex = (
  category: ICategoryOption,
  hexValue: string,
  state?: string
): ICategoryOption => {
  const { oklchStringFromHex } = useColorConversion()
  const oklchStr = oklchStringFromHex(hexValue)

  if (!state) {
    category.oklch = oklchStr
    category._hex = hexValue
  } else if (state === 'content') {
    category.contentOklch = oklchStr
    category._contentHex = hexValue
  } else if (state === 'hover') {
    category.hoverOklch = oklchStr
    category._hoverHex = hexValue
  } else if (state === 'focus') {
    category.focusOklch = oklchStr
    category._focusHex = hexValue
  }
  return category
}

const validateCategoryName: TValidateCategoryName = (
  categories: ICategoryOption[],
  uniqueId: string,
  newName: string
): string => {
  // const uniqueId = this.editedCategory.uniqueId
  newName = (newName || '').trim().toLowerCase()
  // _logger.log(`validateCategoryName "${newName}"`)
  if (/[^a-z]+/.test(newName)) {
    return 'Name can only contain characters from "a" to "z".'
  } else if (newName.length < 3 || newName.length > 20) {
    return 'Name must be between 3 and 20 characters.'
  } else if (
    categories.some((c) => c.uniqueId !== uniqueId && c.id.toLowerCase() === newName)
  ) {
    return 'Name is already in use.'
  }
  return ''
}

export interface IUseCategories {
  getInitialCategoryOptions: () => ICategoryOption[]
  updateCategoryFieldsFromHex: TUpdateCategoryHex
  initCategoryOption: TInitCategoryOption
  validateCategoryName: TValidateCategoryName
}

export const useCategories = (): IUseCategories => {
  return {
    getInitialCategoryOptions,
    updateCategoryFieldsFromHex,
    initCategoryOption,
    validateCategoryName
  }
}
