export type VisitorType<T> = Array<T> | T
export type VisitorCallback<T> = (current: T, parent?: T, ctx?: any) => void
export type VistorCallbackChildren<T> = (current: T, ctx?: any) => Array<T> | undefined | null

const defaultChildren: VistorCallbackChildren<any> = current => current.children

/**
 * visitor is a method to traverse an Object or an array that has a Tree like shape
 *
 * @example
 * ```js
 * const tree = [
 *  {
 *    label: "first",
 *    open: false,
 *    children: [
 *      { label: "children-first-first-element", open: false },
 *      { label: "children-first-second-element", open: false },
 *      { label: "children-first-third-element", open: false }
 *    ]
 *  },
 *  {
 *    label: "second",
 *    open: false,
 *  },
 *  {
 *    label: "first",
 *    open: false,
 *    children: [
 *      { label: "children-third-first-element", open: false },
 *      { label: "children-third-second-element", open: false },
 *      { label: "children-third-third-element", open: false }
 *    ]
 *  }
 * ]
 * ```
 *
 *
 * @param current the current visited object, can be an Array or a object
 * @param visitFn visitor function
 * @param childrenFn children function to search if the current visited object have any child
 * @param parent parent of the current object (undefined for the root except if it's explicitly passed as a parameter)
 * @param ctx optional context
 */
export function visitor<T>(
  current: VisitorType<T>,
  visitFn: VisitorCallback<T>,
  childrenFn: VistorCallbackChildren<T> = defaultChildren,
  parent?: T,
  ctx?: any
): void {
  // nothing to do
  if (!current) {
    return
  }

  // iterate if it's an Array
  if (Array.isArray(current)) {
    const count = current.length
    for (let i = 0; i < count; i++) {
      visitor(current[i], visitFn, childrenFn, parent, ctx)
    }
    return
  }

  // execute the visitor
  visitFn(current, parent, ctx)

  // iterate through if current have children
  const children = childrenFn(current, ctx)
  if (children) {
    const count = children.length
    for (let i = 0; i < count; i++) {
      visitor(children[i], visitFn, childrenFn, current, ctx)
    }
  }
}
