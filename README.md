# Mount React

A simple library that let you mount & unmount React component using JavaScript API.

Sometimes we want to mount & unmount a React component to DOM dynamically, such as modal component, maybe you want to load them using JavaScript API at sometime instead of define it beforehand in the parent component.

## Example

dialog.tsx

```TypeScript
import * as React from 'react'
import { Modal, Form, Input, Button } from 'antd'

/**
 * import MountReactProps from mount-react, use with TypeScript
 */
import { MountReactProps } from '../../lib'

interface Props {
  onSave?: (name: string) => void
}

interface State {
  visible: boolean
  name: string
}

export default class Dialog extends React.Component<
  Props & MountReactProps,
  State
> {
  state: State = {
    visible: true,
    name: ''
  }

  destroy() {
    // destroy current instance
    this.props.destroy && this.props.destroy()
  }

  close() {
    this.setState({
      visible: false
    })
  }

  save() {
    this.props.onSave && this.props.onSave(this.state.name)
    this.close()
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Dialog"
        maskClosable={false}
        onCancel={this.close.bind(this)}
        afterClose={this.destroy.bind(this)}
        footer={[
          <Button onClick={this.close.bind(this)} key="cancel">
            Cancel
          </Button>,
          <Button
            type="primary"
            disabled={!this.state.name}
            onClick={this.save.bind(this)}
            key="save"
          >
            Save
          </Button>
        ]}
      >
        <Form.Item>
          <Input
            placeholder="Your name"
            value={this.state.name}
            onChange={event => {
              this.setState({
                name: event.target.value.trim()
              })
            }}
          />
        </Form.Item>
      </Modal>
    )
  }
}
```

index.tsx

```TypeScript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button, message } from 'antd'

import Mount from '../../lib'
import Dialog from './Dialog'

class App extends React.Component {
  open() {
    Mount(
      <Dialog
        onSave={name => {
          message.success(`Your name is: ${name}`)
        }}
      />
    )
  }

  openAndClose() {
    let unmount = Mount(
      <Dialog
        onSave={name => {
          message.success(`Your name is: ${name}`)
        }}
      />
    )
    setTimeout(() => {
      unmount()
    }, 3000);
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.open.bind(this)}>
          Open Dialog
        </Button>
        <Button type="primary" onClick={this.openAndClose.bind(this)}>
          Open Dialog and close
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
```
In this case, when you click the `Open Dialog` button, Mount React will mount the Dialog component to DOM dynamically, you don't need to define it in the render function of the parent component. The mount function will return a function, when you call it, it will unmount the component you just mounted.

If you did not declare the mount point, the component will be mounted to document.body, you can also mount the component to a custom DOM element, like this

```TypeScript
let unmount = Mount(
  <Button onClick={() => unmount()}>Close</Button>,
  document.querySelector('#wrap')
)
```