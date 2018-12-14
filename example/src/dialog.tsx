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
