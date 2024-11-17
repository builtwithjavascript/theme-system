import type { TKeyValue } from '../shared'

interface IDocumentCssVarInfo {
  id: string
  hasHover: boolean
  hasFocus: boolean
}

const buildCssAttributeColorExpression = (
  cssVarPrefix: string,
  useOkLch: boolean,
  categoryVariation: string,
  opacityVar?: string
): string => {
  // categoryVariation value will be i.e. primary or primary-content etc
  // returns either oklch() or hsl() expressions
  // to set on a css property (i.e. background-color: oklch(var(--etc) var(--etc) var(--etc)) )
  const useOpacityVar = (opacityVar || '').trim().length > 0
  if (useOkLch) {
    // builds the
    let varL = `--${cssVarPrefix}-${categoryVariation}-okl`
    let varC = `--${cssVarPrefix}-${categoryVariation}-okc`
    let varH = `--${cssVarPrefix}-${categoryVariation}-okh`
    const expr = `var(${varL}) var(${varC}) var(${varH})`
    if (!useOpacityVar) {
      return `oklch(${expr})`
    }
    return `oklch(${expr} / var(${opacityVar}))`
  } else {
    // build hsl() expression and return it
    let varH = `--${cssVarPrefix}-${categoryVariation}-h`
    let varS = `--${cssVarPrefix}-${categoryVariation}-s`
    let varL = `--${cssVarPrefix}-${categoryVariation}-l`
    const expr = `var(${varH}) var(${varS}) var(${varL})`
    if (!useOpacityVar) {
      return `hsl(${expr})`
    }
    return `hsl(${expr} / var(${opacityVar})%)`
  }
}

// IMPORTANT: changes to the defaults require updating
// the "excludeIds" array found in method "extractCategoryOption" (hook useCategories)
const defaultCssVarsKeyValues: TKeyValue<string>[] = [
  {
    key: '--bwj-text-opacity',
    //value: 'var(--tw-opacity, 1)',
    value: '1'
  },
  {
    key: '--bwj-content-opacity',
    //value: 'var(--tw-text-opacity, 1)',
    value: '1'
  },
  {
    key: '--bwj-backdrop-opacity',
    //value: 'var(--tw-backdrop-opacity, 1)',
    value: '1'
  },
  {
    key: '--bwj-fill-opacity',
    value: '1'
  },
  {
    key: '--bwj-shadow',
    value: 'var(--tw-shadow, 0 0 #0000)'
  },
  {
    key: '--bwj-ring-inset',
    //value: 'var(--tw-ring-inset, ``)',
    value: ''
  },
  {
    key: '--bwj-ring-offset-width',
    value: 'var(--tw-ring-offset-width, 0px)'
  },
  {
    key: '--bwj-ring-offset-color',
    value: 'var(--tw-ring-offset-color, #ffffff)'
  }
]

const getDocumentCssVarsInfos = (): IDocumentCssVarInfo[] => {
  // use any to avoid TS build time error when using moduleResolution "Bundler"
  // use any to avoid TS build time error when using moduleResolution "Bundler"
  /// these two lines should work either way
  //const distinct: string[] = [...new Set([...Object.values(document.getElementsByTagName('html')[0].style)])] as any
  const distinct: string[] = [
    ...new Set([...Object.values(document.documentElement.style)])
  ]
  let tempResults = distinct
    .map((c) => c.replace(/^[\-\-]+[^\-]+\-{1}/, '')) // (replace prefix, i.e. --bwj-)
    .map((c) => {
      let arr = c.split('-')
      arr.pop()
      return arr.join('-')
    }) // drop last part of the expressionn (i.e. -l or -h etc)
    .filter((c) => c.length > 0 && c.indexOf('-content') === -1) // exlude content as all css var have content variation
    .map((c) => c.split('-'))
    .reduce(
      (accumulator, [id, state]) => {
        // Find if the object already exists in the accumulator
        let obj = accumulator.find((o) => o.id === id)
        if (!obj) {
          // If not, create a new object and push it to the accumulator
          obj = { id, hasHover: false, hasFocus: false }
          accumulator.push(obj)
        }
        // Set hasHover or hasFocus based on the current state
        if (state === 'hover') {
          obj.hasHover = true
        }
        if (state === 'focus') {
          obj.hasFocus = true
        }
        return accumulator
      },
      [] as { id: string; hasHover: boolean; hasFocus: boolean }[]
    )

  // return distinct
  return tempResults //[...new Set(tempResults)]
}

const getDocumentCssVarsKeyValues = (): TKeyValue<string>[] => {
  // use any to avoid TS build time error when using moduleResolution "Bundler"
  /// these two lines should work either way
  //const distinctItems: string[] = [...new Set([...Object.values(document.getElementsByTagName('html')[0].style)])] as any
  const distinctItems: string[] = [
    ...new Set([...Object.values(document.documentElement.style)])
  ]
  const fromHtml: TKeyValue<string>[] = distinctItems
    .filter((k) => (k || '').trim().length > 0)
    .map((key) => {
      return {
        key,
        value: document.documentElement.style.getPropertyValue(key)
      }
    })

  return [...defaultCssVarsKeyValues, ...fromHtml]
}

export interface IUseCssVarsUtils {
  defaultCssVarsKeyValues: TKeyValue<string>[]
  buildCssAttributeColorExpression: (
    cssVarPrefix: string,
    useOkLch: boolean,
    categoryVariation: string,
    opacityVar?: string
  ) => string
  getDocumentCssVarsInfos: () => IDocumentCssVarInfo[]
  getDocumentCssVarsKeyValues: () => TKeyValue<string>[]
}

export const useCssVarsUtils = (): IUseCssVarsUtils => {
  return {
    defaultCssVarsKeyValues,
    buildCssAttributeColorExpression,
    getDocumentCssVarsInfos,
    getDocumentCssVarsKeyValues
  }
}
