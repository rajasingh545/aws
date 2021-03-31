import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu>
      <Menu.Item name="browse" active={true} as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="help" as={Link} to={`/addpost`}>
          <Button icon labelPosition="left" color="blue">
            <Icon name="add" />
            Add Post
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
