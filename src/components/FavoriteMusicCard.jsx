import React from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from './LoadingMessage';

class FavoriteMusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  render() {
    const { trackName,
      previewUrl,
      trackId,
      handleCheckboxChange,
      isChecked,
      trackInfo } = this.props;
    const { isLoading } = this.state;
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
            checked={ isChecked }
            onChange={ (event) => handleCheckboxChange(event, trackInfo) }
          />
        </label>
      </>
    );
  }
}

FavoriteMusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape().isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default FavoriteMusicCard;
