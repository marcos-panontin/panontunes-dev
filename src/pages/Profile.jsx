import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';
import '../css/Profile.css';

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
      <div data-testid="page-profile" className="page-profile">
        <nav>

          <Link to="/search">
            <div className="title-container">
              <p>PanonTunes</p>
            </div>
          </Link>
          <Header />
        </nav>
        {isLoading ? <LoadingMessage /> : (
          <>
            <section className="user-info">

              {/* <img data-testid="profile-image" alt="User Avatar" src="url-to-image" /> */}
              <img
                data-testid="profile-image"
                alt="User Avatar"
                src={ user.image }
                className="user-avatar"
              />
              <p>{ user.name }</p>
              <p>{ user.email }</p>
              <p>{ user.description }</p>

            </section>
            <Link to="/profile/edit" className="btn btn-success">Editar perfil</Link>
          </>
        )}

      </div>
    );
  }
}

export default Profile;
