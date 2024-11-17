export type Fn = () => void
export type Arrayable<T> = T[] | T
export type AnyFn = (...args: any[]) => any
export type TKeyValue<T = unknown> = { key: string; value: T }

export const noop = () => {}
export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'

export function toValue<T>(r: T): T {
  return typeof r === 'function' ? (r as AnyFn)() : r
}
