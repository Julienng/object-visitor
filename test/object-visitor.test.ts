import { visitor } from '../src/object-visitor'
const DEFAULT_TREE: TreeType[] = [
  {
    label: 'first',
    open: false,
    children: [
      { label: 'children-first-first-element', open: false },
      { label: 'children-first-second-element', open: false },
      { label: 'children-first-third-element', open: false }
    ]
  },
  {
    label: 'second',
    open: false
  },
  {
    label: 'first',
    open: false,
    children: [
      { label: 'children-third-first-element', open: false },
      { label: 'children-third-second-element', open: false },
      { label: 'children-third-third-element', open: false }
    ]
  }
]

type TreeType = { label: string; open: boolean; children?: TreeType[] }

let treeList: TreeType[]
let tree: TreeType
beforeEach(() => {
  treeList = DEFAULT_TREE
  tree = DEFAULT_TREE[0]
})

/**
 * Dummy test
 */
describe('traverse', () => {
  it('set open parameter to true when first element is an array', () => {
    visitor(treeList, curr => {
      curr.open = true
    })
    visitor(treeList, curr => {
      expect(curr.open).toBe(true)
    })
  })
  it('set open parameter to true when first element is an object', () => {
    visitor(tree, curr => {
      curr.open = true
    })
    visitor(tree, curr => {
      expect(curr.open).toBe(true)
    })
  })

  it('test if current is undefined', () => {
    let tree = undefined
    visitor(tree, curr => {
      curr.open = true
    })
    expect(tree).toBeUndefined()
  })

  it('set open parameter to true when first element is an array and custom children', () => {
    visitor(
      treeList,
      curr => {
        curr.open = true
      },
      current => current.children
    )
    visitor(
      treeList,
      curr => {
        expect(curr.open).toBe(true)
      },
      current => current.children
    )
  })
  it('set open parameter to true when first element is an object and custom children', () => {
    visitor(
      tree,
      curr => {
        curr.open = true
      },
      current => current.children
    )
    visitor(
      tree,
      curr => {
        expect(curr.open).toBe(true)
      },
      current => current.children
    )
  })
})
