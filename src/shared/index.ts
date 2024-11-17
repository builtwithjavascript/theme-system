export type TKeyValue<T = unknown> = { key: string; value: T }

export interface ICategoryOption {
  uniqueId: string
  id: string
  hasHover: boolean
  hasFocus: boolean

  // need hex fields to bind to <input type="color">
  _hex: string
  _hoverHex?: string
  _focusHex?: string
  _contentHex: string

  oklch: string
  hoverOklch?: string
  focusOklch?: string
  contentOklch: string

  selected: boolean
  flash: boolean
  _initial?: ICategoryOption | undefined
}
