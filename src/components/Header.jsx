import React from 'react';
import LoadingMessage from './LoadingMessage';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    username: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      isLoading: false,
      username: user.name,
    });
  };

  render() {
    const { isLoading, username } = this.state;
    if (isLoading) {
      return (<LoadingMessage />);
    }
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{username}</h1>
      </header>
    );
  }
}

export default Header;
