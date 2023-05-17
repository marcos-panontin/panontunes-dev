import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { favoriteSongsIDS, trackId } = this.props;
    if (!prevState.isFavorite && favoriteSongsIDS.includes(trackId)) {
      console.log('entrou no loop');
      this.setState({
        isFavorite: favoriteSongsIDS.includes(trackId),
      });
    }
  }

  handleCheckboxChange = async ({ target }) => {
    const { trackInfo, trackId } = this.props;
    this.setState({
      isFavorite: target.checked,
      isLoading: true,
    });
    await addSong(trackInfo);
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
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          Favorita

          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.handleCheckboxChange }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape().isRequired,
  favoriteSongsIDS: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
