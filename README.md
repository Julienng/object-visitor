# object-visitor

Object visitor is an utility function to traverse an object or a list that have a tree shape

## Usage

We are going to test the visitor function with the object bellow

```js
const tree = [
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
```

To use the visitor on the previous example to change all `open` keys to `true`, we can do :

```js
visitor(treeList, curr => {
  curr.open = true
})

// or
visitor(
  treeList,
  curr => {
    curr.open = true
  },
  curr => curr.children
)
```

---

This project is created using [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)
