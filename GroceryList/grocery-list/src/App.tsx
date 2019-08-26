import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavComponent /> */}
        {/* The switch will only render the first route to match */}
        <Switch>
          <Route></Route>
          {/* <Route path="/movies" component={GetMovies} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
