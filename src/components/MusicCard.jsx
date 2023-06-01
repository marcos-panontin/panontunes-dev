import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    const { musicIsFavorite } = this.props;
    if (musicIsFavorite) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { favoriteSongsIDS, trackId } = this.props;
    if (!prevState.isFavorite && favoriteSongsIDS.includes(trackId)) {
      this.setState({
        isFavorite: favoriteSongsIDS.includes(trackId),
      });
    }
  }

  handleCheckboxChange = async ({ target }) => {
    const { trackInfo, trackId } = this.props;

    this.setState({
      isLoading: true,
    });
    if (target.checked) {
      await addSong(trackInfo);
    }
    if (!target.checked) {
      await removeSong(trackInfo);
    }
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsIDS = favoriteSongs.map((song) => song.trackId);

    this.setState({
      isFavorite: favoriteSongsIDS.includes(trackId),
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    if (isLoading) {
      return (<LoadingMessage />);
    }

    return (
      <div className="music-container">
        <div className="flex-container">

          <p>{trackName}</p>
          <label className="checkbox-label">

            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ isFavorite }
              onChange={ this.handleCheckboxChange }
            />
            <span className="heart-icon">
              <i className="bi bi-heart-fill" />
            </span>
          </label>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  musicIsFavorite: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape().isRequired,
  favoriteSongsIDS: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
