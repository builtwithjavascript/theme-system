const template: string = `
::-webkit-scrollbar-corner {
  background: 0 0;
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: [track-background];
  border: none;
  border-radius: 0;
}
::-webkit-scrollbar-thumb {
  background: [thumb-background];
  border: none;
  border-radius: 0;
}
`

const buildCssExpression = (
  cssVarPrefix: string,
  useOkLch: boolean,
  categoryVariation: string,
  opacity: number
): string => {
  if (useOkLch) {
    // build oklch() expression and return it
    let varL = `--${cssVarPrefix}-${categoryVariation}-okl`
    let varC = `--${cssVarPrefix}-${categoryVariation}-okc`
    let varH = `--${cssVarPrefix}-${categoryVariation}-okh`
    const expr = `var(${varL}) var(${varC}) var(${varH})`
    return `oklch(${expr} / ${opacity})`
  } else {
    // build hsl() expression and return it
    let varH = `--${cssVarPrefix}-${categoryVariation}-h`
    let varS = `--${cssVarPrefix}-${categoryVariation}-s`
    let varL = `--${cssVarPrefix}-${categoryVariation}-l`
    const expr = `var(${varH}) var(${varS}) var(${varL})`
    return `hsl(${expr} / ${opacity})`
  }
}

export const useScrollbarStyle = (cssVarPrefix: string, useOklch = true) => {
  const trackBackground = buildCssExpression(cssVarPrefix, useOklch, 'primary', 0.2)
  const thumbBackground = buildCssExpression(cssVarPrefix, useOklch, 'primary', 0.85)
  return template
    .replace('[track-background]', trackBackground)
    .replace('[thumb-background]', thumbBackground)
}
