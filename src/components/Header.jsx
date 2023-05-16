import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
