import type { ICategoryOption, TUpdateCategoryHex } from '../models'

const getInitialCategoryOptions = (): ICategoryOption[] => {
  // the different categories of our theme
  // (each match a group of css classes i.e. bg-primary, content-primary etc)
  return [
    {
      id: 'primary',
      hasHover: true,
      hasFocus: true,
      hexValue: '#00bfff',
      hoverHex: '#3dc7f5',
      focusHex: '#80dfff',
      contentHex: '#ffffff',
      selected: false
    },
    {
      id: 'secondary',
      hasHover: true,
      hasFocus: true,
      hexValue: '#f0fbff',
      hoverHex: '#e0f7ff',
      focusHex: '#d6f4ff',
      contentHex: '#0095c7',
      selected: false
    },
    {
      id: 'accent',
      hasHover: true,
      hasFocus: true,
      hexValue: '#fdf59b',
      hoverHex: '#fcf178',
      focusHex: '#fbeb37',
      contentHex: '#000000',
      selected: false
    },
    {
      id: 'neutral',
      hasHover: true,
      hasFocus: true,
      hexValue: '#f5f5f5',
      hoverHex: '#fdfff5',
      focusHex: '#ffffff',
      contentHex: '#000000',
      selected: false
    },
    {
      id: 'disabled',
      hasHover: false,
      hasFocus: false,
      hexValue: '#f2f2f2',
      contentHex: '#8c8c8c',
      selected: false
    },
    {
      id: 'info',
      hasHover: true,
      hasFocus: true,
      hexValue: '#70b5ff',
      hoverHex: '#5cabff',
      focusHex: '#c2dfff',
      contentHex: '#ffffff',
      selected: false
    },
    {
      id: 'success',
      hasHover: true,
      hasFocus: true,
      hexValue: '#8cf28c',
      hoverHex: '#a8f0a8',
      focusHex: '#19e619',
      contentHex: '#000000',
      selected: false
    },
    {
      id: 'warning',
      hasHover: true,
      hasFocus: true,
      hexValue: '#ffc266',
      hoverHex: '#f5a83d',
      focusHex: '#fdb953',
      contentHex: '#000000',
      selected: false
    },
    {
      id: 'danger',
      hasHover: true,
      hasFocus: true,
      hexValue: '#ff6666',
      hoverHex: '#f50000',
      focusHex: '#f07575',
      contentHex: '#ffffff',
      selected: false
    },
    {
      id: 'body',
      hasHover: false,
      hasFocus: false,
      hexValue: '#363636',
      contentHex: '#efefef',
      selected: false
    },
    {
      id: 'card',
      hasHover: false,
      hasFocus: false,
      hexValue: '#dedede',
      contentHex: '#333333',
      selected: false
    },
    {
      id: 'code',
      hasHover: false,
      hasFocus: false,
      hexValue: '#3a3753',
      contentHex: '#c2dcff',
      selected: false
    }
  ]
}

const updateCategoryHex: TUpdateCategoryHex = (
  category: ICategoryOption,
  hexValue: string,
  state?: string
): ICategoryOption => {
  if (!state) {
    category.hexValue = hexValue
  } else if (state === 'content') {
    category.contentHex = hexValue
  } else if (state === 'hover') {
    category.hoverHex = hexValue
  } else if (state === 'focus') {
    category.focusHex = hexValue
  }
  return category
}

interface IUseCategories {
  getInitialCategoryOptions: () => ICategoryOption[]
  updateCategoryHex: TUpdateCategoryHex
}

export const useCategories = (): IUseCategories => {
  return {
    getInitialCategoryOptions,
    updateCategoryHex
  }
}
