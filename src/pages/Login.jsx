import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';
import womanImage from '../css/images/woman.png';

class Login extends React.Component {
  state = {
    name: '',
    password: '',
    checked: false,
    buttonDisabled: true,
    isLoading: false,
  };

  validateLogin = () => {
    const { name, password, checked } = this.state;
    const minimumLength = 3;
    return (name.length >= minimumLength)
      && (password.length >= minimumLength) && checked;
  };

  handleChange = ({ target }) => {
    const { name, value, checked } = target;
    if (name === 'checkbox') {
      this.setState({
        checked,
      }, () => {
        this.setState({
          buttonDisabled: !this.validateLogin(),
        });
      });
    } else {
      this.setState({
        [name]: value,
      }, () => {
        this.setState({
          buttonDisabled: !this.validateLogin(),
        });
      });
    }
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
    const { name, password, checked, buttonDisabled, isLoading } = this.state;
    if (isLoading) {
      return (<LoadingMessage />);
    }
    return (
      <div data-testid="page-login" className="login-container">
        <div className="title-container">
          <p>PanonTunes</p>
        </div>

        <img src={ womanImage } alt="logo" className="woman-image" />
        <form>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              name="name"
              type="text"
              id="name-input"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Nome"
            />
            <label htmlFor="floatingInput">Nome</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              data-testid="login-name-input"
              value={ password }
              onChange={ this.handleChange }
              type="password"
              name="password"
              placeholder="Senha"
              id="exampleInputPassword1"
            />
            <label htmlFor="floatingInput">Senha</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="checkbox"
              checked={ checked }
              onChange={ this.handleChange }
            />
            <label
              className="form-check-label"
              htmlFor="exampleCheck1"
            >
              Concordo com os termos de serviço.

            </label>
          </div>
          <button
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
            className="login-btn"
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
