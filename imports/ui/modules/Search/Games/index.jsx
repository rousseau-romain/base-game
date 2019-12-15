import React, {
  useState, useEffect, useMemo, useContext,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { AppContext } from '/imports/ui/context';
import Navbar from '/imports/ui/components/Navbar';
import List from '@material-ui/core/List';
import ItemGame from './ItemGame';

const Games = ({ history }) => {
  const [listGames, setListGames] = useState([]);

  const { inputSearch } = useContext(AppContext);

  useEffect(() => {
    Meteor.call('games.getByName', inputSearch, (err, result) => {
      if (err) toast.error(err.reason);
      else setListGames(result);
    });
  }, [inputSearch]);

  const displayGames = useMemo(() => listGames.map(value => (
    <ItemGame
      history={history}
      id={value._id}
      key={value._id}
      name={value.name}
      imageUrl={value.imageUrl}
    />
  )), [history, listGames]);

  return (
    <div>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <List dense={false}>
        {displayGames}
      </List>
    </div>
  );
};

export default withRouter(Games);
