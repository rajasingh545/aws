import { Home, AddPost, NotFound } from "./Pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/addpost" component={AddPost} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
