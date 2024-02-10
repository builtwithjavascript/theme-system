const isInViewport = (
  element: HTMLElement,
  parentElement: HTMLElement,
  offsetTop: number = 0
): boolean => {
  const elemRect = element.getBoundingClientRect() // Get the bounding rectangle of the element
  const parentRect = parentElement.getBoundingClientRect() // Get the bounding rectangle of the parent

  const result =
    elemRect.top >= parentRect.top + offsetTop &&
    elemRect.left >= parentRect.left &&
    elemRect.bottom <= parentRect.bottom &&
    elemRect.right <= parentRect.right
  return result
}

export const useIsInViewport = () => {
  return {
    isInViewport
  }
}
