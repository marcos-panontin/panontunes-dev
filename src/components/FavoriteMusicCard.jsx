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
      <div className="music-container">
        <div className="flex-container">

          <p>{trackName}</p>
          <label className="checkbox-label">

            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ isChecked }
              onChange={ (event) => handleCheckboxChange(event, trackInfo) }
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

FavoriteMusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape().isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default FavoriteMusicCard;
