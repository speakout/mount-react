import * as ReactDOM from 'react-dom'

/**
 * unmount component from DOM
 * @param node mount point
 */
function unmount(node: Element) {
  ReactDOM.unmountComponentAtNode(node)
  if (node) {
    node.parentNode.removeChild(node)
  }
}

/**
 * mount React component to DOM
 * @param element JSX Element that wanted to mount
 * @param parent mount point
 */
export default function mount(element: JSX.Element, parent?: Element) {
  let el = document.createElement('div')
  if (parent) {
    parent.appendChild(el)
  } else {
    document.body.appendChild(el)
  }
  ReactDOM.render(element, el)
  return () => {
    unmount(el)
  }
}