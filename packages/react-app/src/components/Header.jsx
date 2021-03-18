import React from "react";
import { PageHeader, Row, Col, Button, Menu, Alert, Switch as SwitchD } from "antd";
import { Route, Link } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";

// displays a page header

export default function Header({route, setRoute, children}) {
  return (
    <header>
      <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
        <PageHeader
          title="🏗 scaffold-eth-lite"
          subTitle="a lighter weight scaffold-eth"
          style={{ cursor: "pointer" }}
        />
      </a>
      <Menu style={{ textAlign:"center" }} selectedKeys={[route]} mode="horizontal">
      <Menu.Item key="/">
        <Link onClick={()=>{setRoute("/")}} to="/">YourContract</Link>
      </Menu.Item>
      <Menu.Item key="/hints">
        <Link onClick={()=>{setRoute("/hints")}} to="/hints">Hints</Link>
      </Menu.Item>
      <Menu.Item key="/exampleui">
        <Link onClick={()=>{setRoute("/exampleui")}} to="/exampleui">ExampleUI</Link>
      </Menu.Item>
      <Menu.Item key="/mainnetdai">
        <Link onClick={()=>{setRoute("/mainnetdai")}} to="/mainnetdai">Mainnet DAI</Link>
      </Menu.Item>
      <Menu.Item key="/subgraph">
        <Link onClick={()=>{setRoute("/subgraph")}} to="/subgraph">Subgraph</Link>
      </Menu.Item>
      <Menu.Item key="/account">
        {children}
      </Menu.Item>
      </Menu>
    </header>
  );
}
