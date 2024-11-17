import { useColorConversion } from '../use-color-conversion'

export type TUpdateDocumentStyleProp = (
  cssVarPrefix: string,
  useOkLch: boolean,
  key: string,
  strOklch: string,
  state?: string
) => void

const updateDocumentStyleProp: TUpdateDocumentStyleProp = (
  cssVarPrefix: string,
  useOkLch: boolean,
  key: string,
  strOklch: string,
  state?: string
) => {
  const { oklchStringToLchArray, oklchStringToHslArray } = useColorConversion()

  let valueArr: string[] = []
  if (useOkLch) {
    valueArr = oklchStringToLchArray(strOklch)
  } else {
    valueArr = oklchStringToHslArray(strOklch)
  }

  // we end up building something like "--bwj-category-l" (for hsl)
  // or like "--bwj-category-okl" (for oklch)
  // since this values are coming from an array
  // that will be either like [h,s,l] or [l,c,h],
  // we need to use these dynamic postfix to build our expression dynamically
  const postfix0 = useOkLch ? `okl` : `h`
  const postfix1 = useOkLch ? `okc` : `s`
  const postfix2 = useOkLch ? `okh` : `l`

  const documentStyle = document.documentElement.style
  if (!state) {
    documentStyle.setProperty(`--${cssVarPrefix}-${key}-${postfix0}`, `${valueArr[0]}`)
    documentStyle.setProperty(`--${cssVarPrefix}-${key}-${postfix1}`, `${valueArr[1]}`)
    documentStyle.setProperty(`--${cssVarPrefix}-${key}-${postfix2}`, `${valueArr[2]}`)
  } else {
    documentStyle.setProperty(
      `--${cssVarPrefix}-${key}-${state}-${postfix0}`,
      `${valueArr[0]}`
    )
    documentStyle.setProperty(
      `--${cssVarPrefix}-${key}-${state}-${postfix1}`,
      `${valueArr[1]}`
    )
    documentStyle.setProperty(
      `--${cssVarPrefix}-${key}-${state}-${postfix2}`,
      `${valueArr[2]}`
    )
  }
}

interface IUpdateDocumentStyleProp {
  updateDocumentStyleProp: typeof updateDocumentStyleProp
}

export const useUpdateDocumentStyleProp = (): IUpdateDocumentStyleProp => {
  return {
    updateDocumentStyleProp
  }
}
