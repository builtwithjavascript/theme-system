import type {
  ICategoryOption,
  TInitCategoryOption,
  TUpdateCategoryHex,
  TValidateCategoryName
} from '../models'
import { useColorConversion } from './useColorConversion'

// use this commented out code only to genered the initial categories
// import { oklchCategories } from './oklchCategories'
// console.log('oklchCategories')
// console.log(JSON.stringify(oklchCategories, null, 2))

export const uniqueId = (): string => {
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

const initCategoryOption: TInitCategoryOption = (id: string): ICategoryOption => {
  return {
    uniqueId: uniqueId(),
    id,
    hasHover: true,
    hasFocus: true,

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
  const results: ICategoryOption[] = [
    {
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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
      uniqueId: uniqueId(),
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

  return results
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
  // console.log(`validateCategoryName "${newName}"`)
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

interface IUseCategories {
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
