import type {
  ICategoryOption,
  TConvertHexValue,
  TUpdateDocumentStyleProp,
  TComputeStyleSheetContent
} from '../models'
import { useCssVarsUtils } from '../css-vars'
import { useColorConversion } from '../color-conversion'

const cleanUpWhiteSpace = (input: string) => {
  return input.replace(/\s+/gi, ' ')
}

const privateComputeStyleSheetContent = (
  selectedCategories: ICategoryOption[],
  buildCssVarExpression: (input: string) => string
) => {
  // compute css classes
  const func = buildCssVarExpression

  let mainClasses: string[] = []
  const focusClasses: string[] = []
  const hoverClasses: string[] = []

  selectedCategories.forEach((category) => {
    const name = category.id

    // compute classes
    mainClasses.push(
      cleanUpWhiteSpace(`
        .bg-${name} {
          background-color: ${func(name)};
        }`),
      cleanUpWhiteSpace(`
        .content-${name} {
          color: ${func(`${name}-content`)};
        }`),
      cleanUpWhiteSpace(`
        .border-${name} {
          border-color: ${func(name)};
        }`),
      cleanUpWhiteSpace(`
        .hover\:ring-${name}:hover,
        .focus\:ring-${name}:focus,
        .active\:ring-${name}:active,
        .ring-${name} {
          --wpt-ring-color: ${func(name)};
        }`),
      // bg-invert uses the [category]-content value for "background-color"
      cleanUpWhiteSpace(`
        .bg-${name}-invert {
          background-color: ${func(`${name}-content`)};
        }`),
      // content-invert uses the bg-[category] value for "color"
      cleanUpWhiteSpace(`
        .content-${name}-invert {
          color: ${func(name)};
        }`)
    )

    // focus:
    if (category.hasFocus) {
      focusClasses.push(
        cleanUpWhiteSpace(`
          .bg-${name}-focus {
            background-color: ${func(`${name}-focus`)};
          }`),
        cleanUpWhiteSpace(`
          .border-${name}-focus {
            border-color: ${func(`${name}-focus`)};
          }`),
        cleanUpWhiteSpace(`
          .ring-${name} {
            --wpt-ring-color: ${func(`${name}-focus`)};
          }`),
        cleanUpWhiteSpace(`
          .ring-offset-${name} {
            --wpt-ring-offset-color: ${func(`${name}-focus`)};
          }`)
      )
    }

    if (category.hasHover) {
      hoverClasses.push(
        cleanUpWhiteSpace(`
          .bg-${name}:hover {
            background-color: ${func(`${name}-hover`)}
          }`),
        cleanUpWhiteSpace(`
          .border-${name}:hover {
            border-color: ${func(`${name}-hover`)}
          }`)
      )
    }
  })

  const allResults = [
    `
    .focus\:ring-2:focus {
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--wpt-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--wpt-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    }
    `,
    mainClasses.join('\n'),
    focusClasses.join('\n'),
    // add hover within @media query so we exclude it from mobile devices
    `\n
      @media (hover: hover) and (pointer: fine) {
        ${hoverClasses.join('\n')}
      }\n
    `
  ]

  return allResults.join('\n')
}

const privateUpdateDocumentStyleProp = (
  convertHexValue: TConvertHexValue,
  useOkLch: boolean,
  key: string,
  hexValue: string,
  state?: string
) => {
  const valueArr = convertHexValue(hexValue, useOkLch)
  // we end up building something like "--wpt-category-l" (for hsl)
  // or like "--wpt-category-okl" (for oklch)
  // since this values are coming from an array
  // that will be either like [h,s,l] or [l,c,h],
  // we need to use these dynamic postfix to build our expression dynamically
  const postfix0 = useOkLch ? `okl` : `h`
  const postfix1 = useOkLch ? `okc` : `s`
  const postfix2 = useOkLch ? `okh` : `l`

  // console.log('updateDocumentStyleProp: TODO', key, hexValue, oklch, oklchArr)
  const documentStyle = document.documentElement.style
  if (!state) {
    documentStyle.setProperty(`--wpt-${key}-${postfix0}`, `${valueArr[0]}`)
    documentStyle.setProperty(`--wpt-${key}-${postfix1}`, `${valueArr[1]}`)
    documentStyle.setProperty(`--wpt-${key}-${postfix2}`, `${valueArr[2]}`)
  } else {
    documentStyle.setProperty(`--wpt-${key}-${state}-${postfix0}`, `${valueArr[0]}`)
    documentStyle.setProperty(`--wpt-${key}-${state}-${postfix1}`, `${valueArr[1]}`)
    documentStyle.setProperty(`--wpt-${key}-${state}-${postfix2}`, `${valueArr[2]}`)
  }
}

interface IUseStyleSheetUtils {
  computeStyleSheetContent: TComputeStyleSheetContent
  updateDocumentStyleProp: TUpdateDocumentStyleProp
}

export const useStyleSheetUtils = (): IUseStyleSheetUtils => {
  const cssVarsUtils = useCssVarsUtils()

  // wrapper around buildCssAttributeColorExpression so we can more easily pass ependencies
  const computeStyleSheetContent = (
    selectedCategories: ICategoryOption[],
    useOkLch: boolean
  ): string => {
    // wrapper around buildCssAttributeColorExpression so we can more easily pass ependencies
    const buildCssVarExpression = (input: string): string => {
      return cssVarsUtils.buildCssAttributeColorExpression(useOkLch, input)
    }

    return privateComputeStyleSheetContent(selectedCategories, buildCssVarExpression)
  }

  const updateDocumentStyleProp: TUpdateDocumentStyleProp = (
    useOkLch: boolean,
    key: string,
    hexValue: string,
    state?: string
  ) => {
    const { convertHexValue } = useColorConversion()

    return privateUpdateDocumentStyleProp(convertHexValue, useOkLch, key, hexValue, state)
  }

  return {
    computeStyleSheetContent,
    updateDocumentStyleProp
  }
}
