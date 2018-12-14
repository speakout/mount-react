import * as React from 'react'
import * as ReactDOM from 'react-dom'

export type Unmount = () => void

export interface MountReactProps {
  destroy?: Unmount
}

/**
 * unmount component from DOM
 * @param node mount point
 */
function unmount(node: HTMLElement) {
  ReactDOM.unmountComponentAtNode(node)
  if (node && node.parentNode) {
    node.parentNode.removeChild(node)
  }
}

/**
 * mount React component to DOM
 * @param element JSX Element that wanted to mount
 * @param parent mount point
 */
export default function mount(element: JSX.Element, parent?: Element): Unmount {
  let el = document.createElement('div')
  document.body.appendChild(el)
  let node = React.cloneElement(element, {
    destroy: () => unmount(el)
  })
  if (parent) {
    parent.appendChild(el)
  } else {
    document.body.appendChild(el)
  }
  ReactDOM.render(node, el)
  return () => {
    unmount(el)
  }
}