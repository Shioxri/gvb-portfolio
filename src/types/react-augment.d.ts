import 'react'

declare module 'react' {
  /** Lets components set CSS custom properties through the `style` prop. */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }

  /**
   * `inert` ships in every current browser but is only typed from React 19
   * onward. The mobile menu uses it to take the closed panel out of the tab
   * order without also hiding it from the transition.
   */
  // The type parameter name has to match React's own declaration for the
  // merge to apply, even though nothing here references it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: '' | undefined
  }
}
