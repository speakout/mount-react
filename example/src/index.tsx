import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button, message } from 'antd'

import Mount from '../../lib'
import Dialog from './dialog'

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
