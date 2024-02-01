const buildCssAttributeColorExpression = (
  cssVarPrefix: string,
  useOkLch: boolean,
  categoryVariation: string,
  opacityValue?: number
): string => {
  // categoryVariation value will be i.e. primary or primary-content etc
  // returns either oklch() or hsl() expressions
  // to set on a css property (i.e. background-color: oklch(var(--etc) var(--etc) var(--etc)) )
  if (useOkLch) {
    // builds the
    let varL = `--${cssVarPrefix}-${categoryVariation}-okl`
    let varC = `--${cssVarPrefix}-${categoryVariation}-okc`
    let varH = `--${cssVarPrefix}-${categoryVariation}-okh`
    const result = `oklch( var(${varL}) var(${varC}) var(${varH}) )`
    if (opacityValue === undefined) {
      return result
    }

    return `oklch( var(${varH}) var(${varC}) var(${varH}) / ${opacityValue} )`
  } else {
    // build hsl() expression and return it
    let varH = `--${cssVarPrefix}-${categoryVariation}-h`
    let varS = `--${cssVarPrefix}-${categoryVariation}-s`
    let varL = `--${cssVarPrefix}-${categoryVariation}-l`
    const result = `hsl( var(${varH}) var(${varS}) var(${varL}) )`
    if (opacityValue === undefined) {
      return result
    }
    return `hsl( var(${varH}) var(${varS}) var(${varL}) / ${opacityValue}%)`
  }
}

interface IUseCssVarsUtils {
  buildCssAttributeColorExpression: typeof buildCssAttributeColorExpression
}

export const useCssVarsUtils = (): IUseCssVarsUtils => {
  return {
    buildCssAttributeColorExpression
  }
}
