import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import FavoriteMusicCard from '../components/FavoriteMusicCard';
import LoadingMessage from '../components/LoadingMessage';

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

    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  };

  handleCheckboxChange = async ({ target }, trackInfo) => {
    console.log(trackInfo);

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

    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    // const favoriteSongsIDS = favoriteSongs.map((song) => song.trackId);

    return (
      <div data-testid="page-favorites" className="page-favorites">
        <nav>

          <div className="title-container">
            <p>PanonTunes</p>
          </div>
          <Header />
        </nav>
        <div className="musics-container">

          {isLoading ? <LoadingMessage /> : favoriteSongs
            .map((track) => (<FavoriteMusicCard
              key={ track.trackId }
              trackId={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackInfo={ track }
              favoriteSongs={ favoriteSongs }
              isChecked={ favoriteSongs
                .map((song) => song.trackId).includes(track.trackId) }
              handleCheckboxChange={ this.handleCheckboxChange }
            />))}
        </div>

      </div>
    );
  }
}

export default Favorites;
