import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

class Profile extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <LoadingMessage /> : (
          <>
            <section className="user-info">

              <img data-testid="profile-image" alt="User Avatar" src="url-to-image" />
              <p>{ user.name }</p>
              <p>{ user.email }</p>
              <p>{ user.description }</p>

            </section>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}

      </div>
    );
  }
}

export default Profile;
