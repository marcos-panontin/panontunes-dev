import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  handleCheckboxChange = async ({ target }) => {
    const { trackInfo } = this.props;
    console.log(trackInfo);
    this.setState({
      isFavorite: target.checked,
      isLoading: true,
    });
    await addSong(trackInfo);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
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
};

export default MusicCard;
