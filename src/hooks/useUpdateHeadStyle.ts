const _styleElementId = 'bwj-themesystem'

const updateHeadStyle = (styleSheetContent: string) => {
  let elStyle = document.getElementById(_styleElementId)
  // console.log('updateHeadStyle existing elStyle', elStyle)
  if (!elStyle) {
    elStyle = document.createElement('style')
    elStyle.id = _styleElementId
    // @ts-ignore
    elStyle.type = 'text/css'
    elStyle.innerHTML = styleSheetContent
    document.getElementsByTagName('head')[0].appendChild(elStyle)
  } else {
    elStyle.innerHTML = styleSheetContent
  }
}

const getHeadStyle = (): string => {
  let elStyle = document.getElementById(_styleElementId)
  // console.log('updateHeadStyle existing elStyle', elStyle)
  if (!elStyle) {
    console.warn('not found')
  }
  return elStyle?.innerText || ''
}

interface IUseUpdateHeadStyle {
  updateHeadStyle: typeof updateHeadStyle
  getHeadStyle: typeof getHeadStyle
}

export const useUpdateHeadStyle = (): IUseUpdateHeadStyle => {
  return {
    updateHeadStyle,
    getHeadStyle
  }
}
