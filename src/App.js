import './App.css'
import {Redirect, Route, Switch} from 'react-router-dom'
import TechEra from './components/TechEra'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
