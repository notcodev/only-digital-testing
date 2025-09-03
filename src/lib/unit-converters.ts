export const px = (value: string) => {
  const replaced = value.replace('em', '')

  if (!Number.isNaN(Number(replaced))) {
    return Number(replaced) * 16
  }

  throw new Error(
    'Received invalid input value in px() converter, currently supported input units: em',
  )
}

export const em = (value: number | string) => {
  if (typeof value === 'number') {
    return `${value / 16}em`
  }

  const replaced = value.replace('px', '')

  if (!Number.isNaN(Number(replaced))) {
    return
  }

  throw new Error(
    'Received invalid input value in em() converter, currently supported input units: px',
  )
}
