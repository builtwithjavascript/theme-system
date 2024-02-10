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

interface IDocumentCssVarInfo {
  id: string
  hasHover: boolean
  hasFocus: boolean
}

const getDocumentCssVars = (): IDocumentCssVarInfo[] => {
  // use any to avoid TS build time error when using moduleResolution "Bundler"
  const distinct: string[] = new Set([
    ...Object.values(document.getElementsByTagName('html')[0].style)
  ]) as any
  let tempResults = [...distinct]
    .map((c) => c.replace(/^[\-\-]+[^\-]+\-{1}/, '')) // (replace prefix, i.e. --wpt-)
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

const getDocumentCssVarsWithValues = () => {
  // use any to avoid TS build time error when using moduleResolution "Bundler"
  const distinct: string[] = new Set([
    ...Object.values(document.getElementsByTagName('html')[0].style)
  ]) as any
  const fromHtml = [...distinct]
    .filter((k) => (k || '').trim().length > 0)
    .map((key) => {
      return {
        key,
        value: document.documentElement.style.getPropertyValue(key)
      }
    })

  const defaults = [
    {
      key: '--wpt-shadow',
      value: '0 0 #0000'
    },
    {
      key: '--wpt-ring-inset',
      value: ''
    },
    {
      key: '--wpt-ring-offset-width',
      value: '0px'
    },
    {
      key: '--wpt-ring-offset-color',
      value: '#ffffff'
    }
  ]

  return [...defaults, ...fromHtml]
}

interface IUseCssVarsUtils {
  buildCssAttributeColorExpression: typeof buildCssAttributeColorExpression
  getDocumentCssVars: typeof getDocumentCssVars
  getDocumentCssVarsWithValues: typeof getDocumentCssVarsWithValues
}

export const useCssVarsUtils = (): IUseCssVarsUtils => {
  return {
    buildCssAttributeColorExpression,
    getDocumentCssVars,
    getDocumentCssVarsWithValues
  }
}
