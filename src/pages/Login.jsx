import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

class Login extends React.Component {
  state = {
    name: '',
    buttonDisabled: true,
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minimumLength = 3;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < minimumLength,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      isLoading: true,
    });

    await createUser({ name });

    history.push('/search');
  };

  render() {
    const { name, buttonDisabled, isLoading } = this.state;
    if (isLoading) {
      // return (<LoadingMessage />);
      return (<p>Carregando...</p>);
    }
    return (
      <div data-testid="page-login">
        <form>

          <label htmlFor="name-input">
            Nome:
            <input
              name="name"
              value={ name }
              type="text"
              data-testid="login-name-input"
              id="name-input"
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
