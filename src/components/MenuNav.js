import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { useAuth } from '../contexts/AuthContext';

export default function MenuNav() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  function handleItemClick(e, { name }) {
    navigate("/" + name);
  }

  return (
    <Menu stackable inverted>
      <Menu.Item>
        <img src={"./logo.png"} alt="img" />
      </Menu.Item>

      <Menu.Item
        name='testForm'
        onClick={handleItemClick}
      >
        Test Form
      </Menu.Item>

      <Menu.Item
        name='reqTable'
        onClick={handleItemClick}
      >
        Build Requests
      </Menu.Item>

      <Dropdown item text='in Beta'>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleItemClick} name="dataDash">Analyze Data</Dropdown.Item>
          <Dropdown.Item onClick={handleItemClick} name="enterNew">Upload Data</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position='right'>
        <Dropdown item text='Admin Views'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleItemClick} name="pendingTable">Build Requests: <em>WFA</em></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item>
          <Button color="teal" onClick={signOut}>Sign Out</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}