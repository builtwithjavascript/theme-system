import type { TKeyValue, ICategoryOption } from '../shared'
import { useCssVarsUtils } from '../use-css-vars-utils'
import { useScrollbarStyle } from '../use-scrollbar-style'

// opacity vars
const TEXT_OPACITY_VAR = `--bwj-text-opacity`
const CONTENT_OPACITY_VAR = `--bwj-content-opacity`
const BACKDROP_OPACITY_VAR = `--bwj-backdrop-opacity` // only for bg colors
const FILL_OPACITY_VAR = `--bwj-fill-opacity`

const _privateComputeStyleSheetContent = (
  cssVarPrefix: string,
  selectedCategories: ICategoryOption[],
  buildCssVarExpression: (input: string, opacityVar?: string) => string,
  formatNicely?: boolean
): string => {
  // compute css classes
  const func = buildCssVarExpression

  const mainClasses: TKeyValue<string>[] = []
  let opacityClasses: TKeyValue<string>[] = []
  const focusClasses: TKeyValue<string>[] = []
  let hoverClasses: TKeyValue<string>[] = []
  let groupHoverClasses: TKeyValue<string>[] = []

  // content-opacity
  const opacities = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
  ]

  opacityClasses = [
    // textOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.opacity-${x}`,
        value: `${TEXT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // contentOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.content-opacity-${x}`,
        value: `${CONTENT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // bgOpacityClasses:
    ...opacities.map((x) => {
      return {
        key: `.bg-opacity-${x}`,
        value: `${BACKDROP_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    })
  ]

  hoverClasses = [
    // textOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.hover\\:opacity-${x}:hover`,
        value: `${TEXT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // contentOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.hover\\:content-opacity-${x}:hover`,
        value: `${CONTENT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // bgOpacityClasses:
    ...opacities.map((x) => {
      return {
        key: `.hover\\:bg-opacity-${x}:hover`,
        value: `${BACKDROP_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    })
  ]

  groupHoverClasses = [
    // textOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.group:hover .group-hover\\:opacity-${x}`,
        value: `${TEXT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // contentOpacitiesClasses:
    ...opacities.map((x) => {
      return {
        key: `.group:hover .group-hover\\:content-opacity-${x}`,
        value: `${CONTENT_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    }),
    // bgOpacityClasses:
    ...opacities.map((x) => {
      return {
        key: `.group:hover .group-hover\\:bg-opacity-${x}`,
        value: `${BACKDROP_OPACITY_VAR}: ${Number(`${x / 100}`).toFixed(2)};`
      }
    })
  ]

  selectedCategories.forEach((category) => {
    const name = category.id

    // compute classes
    mainClasses.push(
      {
        key: `.bg-${name}`,
        value: `background-color: ${func(name, BACKDROP_OPACITY_VAR)};`
      },
      {
        key: `.content-${name}`,
        value: `color: ${func(`${name}-content`, CONTENT_OPACITY_VAR)};`
      },
      {
        key: `.text-${name}`,
        value: `color: ${func(name, TEXT_OPACITY_VAR)};`
      },
      {
        key: `.border-${name}`,
        value: `border-color: ${func(name)};`
      },
      {
        key: `.fill-${name}`,
        value: `fill: ${func(name, FILL_OPACITY_VAR)};`
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
        value: `background-color: ${func(`${name}-content`, BACKDROP_OPACITY_VAR)};`
      },
      {
        // content-invert uses the bg-[category] value for "color"
        key: `.content-${name}-invert`,
        value: `color: ${func(name, CONTENT_OPACITY_VAR)};`
      },
      {
        // text-invert uses the bg-[category] value for "color"
        key: `.text-${name}-invert`,
        value: `color: ${func(name, TEXT_OPACITY_VAR)};`
      },
      {
        // fill-invert uses the [category]-content value for "fill"
        key: `.fill-${name}-invert`,
        value: `fill: ${func(`${name}-content`, FILL_OPACITY_VAR)};`
      }
    )

    // file:
    const PSEUDO_FILE_BUTTON = '::file-selector-button'
    mainClasses.push(
      {
        key: `.file\\:bg-${name}${PSEUDO_FILE_BUTTON}`,
        value: `background-color: ${func(name, BACKDROP_OPACITY_VAR)};`
      },
      {
        key: `.file\\:content-${name}${PSEUDO_FILE_BUTTON}`,
        value: `color: ${func(`${name}-content`, CONTENT_OPACITY_VAR)};`
      },
      {
        key: `.file\\:text-${name}${PSEUDO_FILE_BUTTON}`,
        value: `color: ${func(name, TEXT_OPACITY_VAR)};`
      },
      {
        key: `.file\\:border-${name}${PSEUDO_FILE_BUTTON}`,
        value: `border-color: ${func(name)};`
      },
      {
        // bg-invert uses the [category]-content value for "background-color"
        key: `.file\\:bg-${name}-invert${PSEUDO_FILE_BUTTON}`,
        value: `background-color: ${func(`${name}-content`, BACKDROP_OPACITY_VAR)};`
      },
      {
        // content-invert uses the bg-[category] value for "color"
        key: `.file\\:content-${name}-invert${PSEUDO_FILE_BUTTON}`,
        value: `color: ${func(name, CONTENT_OPACITY_VAR)};`
      },
      {
        // text-invert uses the bg-[category] value for "color"
        key: `.file\\:text-${name}-invert`,
        value: `color: ${func(name, TEXT_OPACITY_VAR)};`
      }
    )

    // placeholder
    mainClasses.push(
      {
        key: `.placeholder\\:content-${name}::placeholder`,
        value: `color: ${func(`${name}-content`)};`
      },
      {
        key: `.placeholder\\:text-${name}::placeholder`,
        value: `color: ${func(name)};`
      }
    )

    // focus:
    if (category.hasFocus) {
      focusClasses.push(
        {
          key: `.focus\\:bg-${name}:focus`,
          value: `background-color: ${func(`${name}-focus`, BACKDROP_OPACITY_VAR)};`
        },
        {
          key: `.focus\\:text-${name}:focus`,
          value: `color: ${func(`${name}-focus`, TEXT_OPACITY_VAR)};`
        },
        {
          key: `.focus\\:content-${name}:focus`,
          value: `color: ${func(
            `${name}-focus`,
            CONTENT_OPACITY_VAR
          )};` /* no -focus here as content does not have hover */
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
          value: `background-color: ${func(`${name}-hover`, BACKDROP_OPACITY_VAR)};`
        },
        {
          key: `.hover\\:text-${name}:hover`,
          value: `color: ${func(`${name}-hover`, TEXT_OPACITY_VAR)};`
        },
        {
          key: `.hover\\:content-${name}:hover`,
          value: `color: ${func(
            `${name}-content`,
            CONTENT_OPACITY_VAR
          )};` /* no -hover here as content does not have hover */
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

      // group-hover (do not add :hover suffix on these)
      groupHoverClasses.push(
        {
          key: `.group:hover .group-hover\\:bg-${name}`,
          value: `background-color: ${func(`${name}-hover`, BACKDROP_OPACITY_VAR)};`
        },
        {
          key: `.group:hover .group-hover\\:text-${name}`,
          value: `color: ${func(`${name}-hover`, TEXT_OPACITY_VAR)};`
        },
        {
          key: `.group:hover .group-hover\\:content-${name}`,
          value: `color: ${func(
            `${name}-content`,
            CONTENT_OPACITY_VAR
          )};` /* no -hover here as content does not have hover */
        },
        {
          key: `.group:hover .group-hover\\:border-${name}`,
          value: `border-color: ${func(`${name}-hover`)};`
        },
        {
          key: `.group:hover .group-hover\\:ring-${name}`,
          value: `--${cssVarPrefix}-ring-color: ${func(`${name}-hover`)};`
        },
        {
          key: `.group:hover .group-hover\\:ring-offset-${name}`,
          value: `--${cssVarPrefix}-ring-offset-color: ${func(`${name}-hover`)};`
        }
      )
    }
  })

  const ringClasses: TKeyValue<string>[] = [
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

  const keyValueToCssClassString = (
    item: TKeyValue<string>,
    tabs: number = 2
  ): string => {
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
  const strGroupHoverClasses = groupHoverClasses
    .map((c) => keyValueToCssClassString(c, 4))
    .join('\n')
  const mediaHover = `\n@media (hover: hover) and (pointer: fine) {\n${strHoverClasses}\n${strGroupHoverClasses}\n}\n`

  const allClasses = [...ringClasses, ...opacityClasses, ...mainClasses, ...focusClasses]

  const joinChar = formatNicely ? '\n' : ' '
  return `${allClasses.map((c) => keyValueToCssClassString(c)).join(joinChar)}\n${mediaHover}`
}

type TComputeStyleSheetContent = (
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[],
  formatNicely?: boolean
) => string

// wrapper around _privateComputeStyleSheetContent so we can more easily pass ependencies
const computeStyleSheetContent: TComputeStyleSheetContent = (
  cssVarPrefix: string,
  useOkLch: boolean,
  selectedCategories: ICategoryOption[],
  formatNicely?: boolean
): string => {
  // wrapper around buildCssAttributeColorExpression so we can more easily pass ependencies

  const { buildCssAttributeColorExpression } = useCssVarsUtils()
  const buildCssVarExpression = (input: string, opacityVar?: string): string => {
    return buildCssAttributeColorExpression(cssVarPrefix, useOkLch, input, opacityVar)
  }

  const scrollbarStyles = useScrollbarStyle(cssVarPrefix, useOkLch)

  const styleSheetContent = _privateComputeStyleSheetContent(
    cssVarPrefix,
    selectedCategories,
    buildCssVarExpression,
    formatNicely
  )

  return `${scrollbarStyles}\n${styleSheetContent}`.trim()
}

interface IUseComputeStyleSheetContent {
  computeStyleSheetContent: TComputeStyleSheetContent
}

export const useComputeStyleSheetContent = (): IUseComputeStyleSheetContent => {
  return {
    computeStyleSheetContent
  }
}
