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
      <header data-testid="header-component" className='header-right-side'>
        <h1 data-testid="header-user-name" className='header-user-name'>
          Olá,
          {' '}
          {username}
        </h1>
        <section className="icons-container">

          <Link to="/search" data-testid="link-to-search" className="icon-container">
            <i className="bi bi-search" />
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="icon-container"
          >
            <i className="bi bi-heart" />
          </Link>

          <Link to="/profile" data-testid="link-to-profile" className="icon-container">
            <i className="bi bi-person" />
          </Link>

        </section>

      </header>
    );
  }
}

export default Header;
