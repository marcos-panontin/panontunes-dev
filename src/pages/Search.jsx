import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    // artist: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minimumLength = 2;
    const isDisabled = value.length < minimumLength;
    this.setState({
      [name]: value,
      isDisabled,
    });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist">
            <input
              type="text"
              data-testid="search-artist-input"
              id="search-artist"
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              disabled={ isDisabled }
            >
              Pesquisar

            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
