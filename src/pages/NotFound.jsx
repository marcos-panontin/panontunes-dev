import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <p>Página Não Encontrada</p>

        <Link to="/search" className="btn btn-primary">Me tire daqui, por favor!</Link>

      </div>
    );
  }
}

export default NotFound;
