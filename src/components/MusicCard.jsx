import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewURL } = this.props;
    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
};

export default MusicCard;
