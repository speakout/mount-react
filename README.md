# Mount React

A simple library let you mount & unmount React component using JavaScript API.

Sometimes we want to mount & unmount a React component to DOM Dynamically, such as modal component, maybe you want to load them using JavaScript API at sometime instead of define it beforehand in the parent component.

## Basic Usage

install `Mount React`
```
npm i mount-react
```

child component `modal.tsx`
```TypeScript
import * as React from 'react'

interface Props {
  message: string
  onClose?: () => void
}

export default class extends React.Component<Props> {
  render() {
    return (
      <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.4)', zIndex: 100, textAlign: 'center'}}>
        <div style={{width: '200px', margin: '200px auto', padding: '50px', backgroundColor: '#fff'}}>
          {this.props.message}
          <div style={{marginTop: '30px'}}><button onClick={this.close.bind(this)}>Close</button></div>
        </div>
      </div>
    )
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}
```

parent component
```TypeScript
import * as React from 'react'
import mount from 'mount-react'

import Modal from './modal'

export default class extends React.Component {
  render() {
    return (
      <button onClick={this.open.bind(this)}>Open Modal</button>
    )
  }

  open() {
    let unmount = mount(<Modal message="Hello React" onClose={() => unmount()} />)
  }
}
```
In this case, when you click the `Open Modal` button, Mount React will mount the Modal component to DOM dynamically, you don't need to define it in the render function of the parent component. The mount function will return a function, when you call it, it will unmount the component you just mounted.

If you did not declare the mount point, the component will be mounted to document.body, you can also mount the component to a custom DOM element, like this

```TypeScript
import * as React from 'react'
import mount from 'mount-react'

export default class extends React.Component {
  render() {
    return (
      <div id="wrap">
        <button onClick={this.load.bind(this)}>Load</button>
      </div>
    )
  }

  load() {
    let unmount = mount(<button onClick={() => unmount()}>Close</button>, document.querySelector('#wrap'))
  }
}
```