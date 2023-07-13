import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <img alt="logo" src='https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/fhsuyzojq8wgbpf5bmam' />
        </Menu.Item>

        <Menu.Item
          name='view'
          active={activeItem === 'view'}
          onClick={this.handleItemClick}
        >
          View
        </Menu.Item>

        <Menu.Item
          name='analyze-data'
          active={activeItem === 'analyze-data'}
          onClick={this.handleItemClick}
        >
          Analyze Data
        </Menu.Item>

        <Menu.Item
          name='sign-in'
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    )
  }
}