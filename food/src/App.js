import "./App.css"
import Login from "./components/login"
import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Register from "./components/register"
import Complete from "./components/register_complete"
import Profile from "./components/profile"
import Write from "./components/write"
import Board from "./components/board"
import Test from "./components/test"
import Board_view from "./components/board_view"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      nickName: "",
      loginCheck: false,
      mbti: "",
    }
  }
  changeState = (n, v) => {
    this.setState({ [n]: v })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="navigation">
            <Nav Version={this.state.loginCheck} change={this.changeState} />
          </div>
          <div className="page">
            <Route path="/" exact={true} render={() => <Home change={this.changeState} />} />
            <Route path="/login" exact={true} render={() => <Login change={this.changeState} />} />
            <Route path="/register" exact component={Register} />
            <Route path="/register_complete" exact component={Complete} />
            <Route path="/profile" exact render={() => <Profile array={this.state} />} />
            <Route path="/board/:page" exact component={Board} />
            <Route path="/write" exact render={() => <Write possible={this.state.loginCheck} />} />
            <Route path="/test" exact component={Test} />
            <Route path="/board/:page/:id" exact component={Board_view} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
