import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsIDS = favoriteSongs.map((song) => song.trackId);

    this.setState({
      favoriteSongs,
      favoriteSongsIDS,
      isLoading: false,
    });
  };


  render() {
    const { favoriteSongs, favoriteSongsIDS } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.map((track) => (<MusicCard
          key={ track.trackId }
          trackId={ track.trackId }
          trackName={ track.trackName }
          previewUrl={ track.previewUrl }
          trackInfo={ track }
          musicIsFavorite
          favoriteSongsIDS={ favoriteSongsIDS }
          handleCheckboxChangeOnFavorite={ this.handleCheckboxChangeOnFavorite }
        />))}
      </div>
    );
  }
}

export default Favorites;
