import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumInfo: [],
    favoriteSongsIDS: [],
    isLoading: true,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.fetchMusic(id);
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsIDS = favoriteSongs.map((song) => song.trackId);

    this.setState({
      favoriteSongsIDS,
      isLoading: false,
    });
  };

  fetchMusic = async (id) => {
    const info = await getMusics(id);
    this.setState({
      albumInfo: info,
      isLoading: false,
    });
  };

  render() {
    const { albumInfo, isLoading, favoriteSongsIDS } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {!isLoading && (
          <div>
            <h1 data-testid="artist-name">{albumInfo[0].artistName}</h1>
            <h1 data-testid="album-name">{albumInfo[0].collectionName}</h1>
            {albumInfo
              .filter((_, index) => index !== 0)
              .map((track) => (
                <MusicCard
                  key={ track.trackId }
                  trackId={ track.trackId }
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackInfo={ track }
                  favoriteSongsIDS={ favoriteSongsIDS }
                />
              ))}
          </div>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
