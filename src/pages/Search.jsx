import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from '../components/LoadingMessage';
import Album from './Album';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Search extends React.Component {
  state = {
    artist: '',
    savedName: '',
    isDisabled: true,
    isLoading: false,
    APIRequested: false,
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

  handleClick = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    // Cleaning input field
    this.setState({
      artist: '',
      savedName: artist,
      isLoading: true,
    });

    // API Requisition
    const info = await searchAlbumsAPI(artist);
    this.setState({
      isLoading: false,
      APIRequested: true,
      artistInfo: info,
    });
    console.log(info);
  };

  render() {
    const { isDisabled,
      artist,
      isLoading,
      APIRequested,
      artistInfo,
      savedName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        {isLoading ? <LoadingMessage /> : (
          <form>
            <label htmlFor="search-artist">
              <input
                type="text"
                data-testid="search-artist-input"
                id="search-artist"
                onChange={ this.handleChange }
                value={ artist }
                name="artist"
                placeholder="Pesquise por artista ou banda"

              />
              <button
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar

              </button>
            </label>
          </form>
        )}

        {APIRequested && artistInfo.length > 0 && (
          <div>
            <p>
              {' '}
              Resultado de álbuns de:
              {' '}
              { savedName}
            </p>
            <ul>
              {artistInfo.map((album) => <li key={album.collectionName}>
                <span>{album.collectionName}</span>
                <span>{album.artistName}</span>
                <Link data-testid={`link-to-album-${album.collectionId}`} to={`/album/${album.collectionId}`}>Mais informações</Link>
              </li>)}
            </ul>
          </div>
        )}

        {APIRequested && artistInfo.length === 0 && (
          <div>
            <p>Nenhum álbum foi encontrado</p>
          </div>
        )}

      </div>
    );
  }
}

export default Search;
