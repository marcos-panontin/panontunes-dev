import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

import LoadingMessage from '../components/LoadingMessage';

class ProfileEdit extends React.Component {
  state = {
    isLoading: true,
    buttonDisabled: true,
    name: '',
    email: '',
    description: '',
    image: 'url-to-image',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    console.log(user);
    this.setState({
      isLoading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    }, () => {
      this.setState({
        buttonDisabled: !(this.validateForm()),
      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      buttonDisabled: !(this.validateForm()),
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    console.log(history);
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({
      isLoading: false,
    });
    history.push('/profile');
  };

  validateEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  validateOtherFields = () => {
    const { name, email, description } = this.state;
    console.log(name, email, description);
    return name.length >= 1 && email.length >= 1 && description.length >= 1;
  };

  validateForm = () => this.validateEmail() && this.validateOtherFields();

  render() {
    const { isLoading, buttonDisabled, name, email, description, image } = this.state;
    console.log(buttonDisabled);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <LoadingMessage /> : (
          <form className="user-form">
            <input
              name="name"
              type="text"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              name="email"
              type="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.handleChange }
            />
            <textarea
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
            <input
              name="image"
              type="text"
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.handleChange }
            />
            <button
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Salvar

            </button>

          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
