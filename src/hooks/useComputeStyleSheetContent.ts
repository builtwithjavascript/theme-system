import { ICategoryOption } from '../models'
import { useCssVarsUtils } from './useCssVarsUtils'

type TKeyValue = { key: string; value: string }

const _privateComputeStyleSheetContent = (
  cssVarPrefix: string,
  selectedCategories: ICategoryOption[],
  buildCssVarExpression: (input: string) => string,
  formatNicely?: boolean
) => {
  // compute css classes
  const func = buildCssVarExpression

  const mainClasses: TKeyValue[] = []
  const focusClasses: TKeyValue[] = []
  const hoverClasses: TKeyValue[] = []

  selectedCategories.forEach((category) => {
    const name = category.id

    // compute classes
    mainClasses.push(
      {
        key: `.bg-${name}`,
        value: `background-color: ${func(name)};`
      },
      {
        key: `.content-${name}`,
        value: `color: ${func(`${name}-content`)};`
      },
      {
        key: `.border-${name}`,
        value: `border-color: ${func(name)};`
      },
      {
        key: `.ring-${name}`,
        value: `--${cssVarPrefix}-ring-color: ${func(`${name}`)};`
      },
      {
        key: `.ring-offset-${name}`,
        value: `--${cssVarPrefix}-ring-offset-color: ${func(`${name}`)};`
      },
      {
        // bg-invert uses the [category]-content value for "background-color"
        key: `.bg-${name}-invert`,
        value: `background-color: ${func(`${name}-content`)};`
      },
      {
        // content-invert uses the bg-[category] value for "color"
        key: `.content-${name}-invert`,
        value: `color: ${func(name)};`
      }
    )

    // focus:
    if (category.hasFocus) {
      focusClasses.push(
        {
          key: `.focus\\:bg-${name}:focus`,
          value: `background-color: ${func(`${name}-focus`)};`
        },
        {
          key: `.focus\\:border-${name}:focus`,
          value: `border-color: ${func(`${name}-focus`)};`
        },
        {
          key: `.focus\\:ring-${name}:focus`,
          value: `--${cssVarPrefix}-ring-color: ${func(`${name}-focus`)};`
        },
        {
          key: `.focus\\:ring-offset-${name}:focus`,
          value: `--${cssVarPrefix}-ring-offset-color: ${func(`${name}-focus`)};`
        }
      )
    }

    if (category.hasHover) {
      hoverClasses.push(
        {
          key: `.hover\\:bg-${name}:hover`,
          value: `background-color: ${func(`${name}-hover`)};`
        },
        {
          key: `.hover\\:border-${name}:hover`,
          value: `border-color: ${func(`${name}-hover`)};`
        },
        {
          key: `.hover\\:ring-${name}:hover`,
          value: `--${cssVarPrefix}-ring-color: ${func(`${name}-hover`)};`
        },
        {
          key: `.hover\\:ring-offset-${name}:hover`,
          value: `--${cssVarPrefix}-ring-offset-color: ${func(`${name}-hover`)};`
        }
      )
    }
  })

  const ringClasses: TKeyValue[] = [
    {
      key: `
      .ring-2,
      .hover\\:ring-2:hover,
      .focus\\:ring-2:focus,
      .active\\:ring-2:active`.trim(),
      value: `
      --${cssVarPrefix}-ring-offset-shadow: var(--${cssVarPrefix}-ring-inset) 0 0 0 var(--${cssVarPrefix}-ring-offset-width) var(--${cssVarPrefix}-ring-offset-color);
      --${cssVarPrefix}-ring-shadow: var(--${cssVarPrefix}-ring-inset) 0 0 0 calc(2px + var(--${cssVarPrefix}-ring-offset-width)) var(--${cssVarPrefix}-ring-color);
      box-shadow: var(--${cssVarPrefix}-ring-offset-shadow), var(--${cssVarPrefix}-ring-shadow), var(--${cssVarPrefix}-shadow, 0 0 #0000);
    `.trim()
    },
    {
      key: `
        .ring-offset-2,
        .hover\\:ring-offset-2:hover,
        .focus\\:ring-offset-2:focus,
        .active\\:ring-offset-2:active`.trim(),
      value: `
        --${cssVarPrefix}-ring-offset-width: 2px;
        box-shadow: 0 0 0 var(--${cssVarPrefix}-ring-offset-width) var(--${cssVarPrefix}-ring-offset-color), var(--${cssVarPrefix}-ring-shadow);
      `.trim()
    }
  ]

  const keyValueToCssClassString = (item: TKeyValue, tabs: number = 2): string => {
    if (!formatNicely) {
      return `${item.key} {${item.value}}`
    }

    let strTabs = `${Array(tabs + 1).join(' ')}`
    let startLineTabs = `${Array(tabs - 2 + 1).join(' ')}`

    let tempResult = `${item.key} {${item.value}}`
      .replace(/\s+/gi, ' ') // replace more than 1 space with exactly one space
      .replace(/\;\s+/gi, ';') // replace ; followed by spaces with ;
      .replace(/\{+/gi, '{\n') // replace { with {\n
      .replace(/\;+/gi, `;\n`) // replace ";" with ";\n"
      .replace(/\n+/gi, `\n${strTabs}`) // replace \n with \n + tabs
      .replace(/\s+}/gi, `\n${startLineTabs}}`) // fix closing curly brace

    return `${startLineTabs}${tempResult}`
  }

  // media hover:
  const strHoverClasses = hoverClasses
    .map((c) => keyValueToCssClassString(c, 4))
    .join('\n')
  const mediaHover = `\n@media (hover: hover) and (pointer: fine) {\n${strHoverClasses}\n}\n`

  const allClasses = [...ringClasses, ...mainClasses, ...focusClasses]

  const joinChar = formatNicely ? '\n' : ' '
  return `${allClasses.map((c) => keyValueToCssClassString(c)).join(joinChar)}\n${mediaHover}`
}

// wrapper around _privateComputeStyleSheetContent so we can more easily pass ependencies
const computeStyleSheetContent = (
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[],
  formatNicely?: boolean
): string => {
  // wrapper around buildCssAttributeColorExpression so we can more easily pass ependencies

  const { buildCssAttributeColorExpression } = useCssVarsUtils()
  const buildCssVarExpression = (input: string): string => {
    return buildCssAttributeColorExpression(cssVarPrefix, useOkLch, input)
  }

  return _privateComputeStyleSheetContent(
    cssVarPrefix,
    selectedCategories,
    buildCssVarExpression,
    formatNicely
  )
}

interface IUseComputeStyleSheetContent {
  computeStyleSheetContent: typeof computeStyleSheetContent
}

export const useComputeStyleSheetContent = (): IUseComputeStyleSheetContent => {
  return {
    computeStyleSheetContent
  }
}
