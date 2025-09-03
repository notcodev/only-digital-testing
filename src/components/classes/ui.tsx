import { breakpoints } from '@/lib/consts'
import { em, px } from '@/lib/unit-converters'

export const Classes = () => {
  const classes = Object.entries(breakpoints).reduce<string>(
    (acc, [breakpoint, width]) => {
      const pxValue = px(width)
      const maxWidthBreakpoint = width
      const minWidthBreakpoint = em(pxValue + 0.1)

      return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.hidden-from-${breakpoint} {display: none !important;}}`
    },
    '',
  )

  return <style dangerouslySetInnerHTML={{ __html: classes }} />
}
