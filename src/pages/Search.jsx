import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from '../components/LoadingMessage';
import '../css/Search.css';
import circleImage from '../css/images/circle.png';

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
  };

  render() {
    const { isDisabled,
      artist,
      isLoading,
      APIRequested,
      artistInfo,
      savedName } = this.state;

    return (
      <div data-testid="page-search" className="search-container">
        <nav>

          <div className="title-container">
            <p>PanonTunes</p>
          </div>
          <Header />
        </nav>

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
                className="form-control"

              />
              <button
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
                className="search-btn"
              >
                Pesquisar

              </button>
            </label>
          </form>
        )}

        {APIRequested && artistInfo.length > 0 && (
          <div className="results-container">
            <p className="results-paragraph">

              <span className="band-name">{ savedName}</span>

            </p>
            <ul>
              {artistInfo.map((album) => (

                <Link
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <li className="album">
                    <div className="album-image-container">
                      <img className="album-image" src={ album.artworkUrl100 } alt="" />

                      <img className="album-image-circle" src={ circleImage } alt="" />
                    </div>
                    <span />
                    <span className="album-name">{album.collectionName}</span>

                  </li>
                </Link>
              ))}
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
