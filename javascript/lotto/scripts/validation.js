const isElement = ($element) => {
  return $element instanceof HTMLElement
}

export const validateElement = ($element) => {
  if (!isElement($element)) {
    throw new Error('Invalid DOM Element: ${$element}')
  }
}
