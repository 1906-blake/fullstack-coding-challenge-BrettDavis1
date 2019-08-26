import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GetGroceryItems from './components/grocery-list/grocery-list.component';
import GetGroceryList from './components/grocery-lists/grocery-lists.component';
import { NavComponent } from './components/nav-bar/nav-bar.componenet';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent />
        {/* The switch will only render the first route to match */}
        <Switch>
          <Route path="/items" component={GetGroceryItems} />
          <Route path="/lists" component={GetGroceryList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
