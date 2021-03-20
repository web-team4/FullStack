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
import Test_result from "./components/test_result"
import Board_view from "./components/board_view"
import Axios from "axios"
Axios.defaults.withCredentials = true
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
  componentDidMount() {
    Axios.post("/")
      .then(res => {
        this.setState({
          id: res.data.id,
          nickName: res.data.nickName,
          loginCheck: res.data.loginCheck,
        })
      })
      .catch(err => {
        console.log(err)
      })
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
            <Route path="/" exact render={() => <Home change={this.changeState} />} />
            <Route path="/login" exact render={() => <Login change={this.changeState} />} />
            <Route path="/register" exact component={Register} />
            <Route path="/register_complete" exact component={Complete} />
            <Route
              path="/profile"
              exact
              render={props => <Profile array={this.state} change={this.changeState} {...props} />}
            />
            <Route path="/board/:page" exact component={Board} />
            <Route
              path="/write"
              exact
              render={props =>
                <Write possible={this.state.loginCheck} change={this.changeState} {...props} />}
            />
            <Route path="/test" exact component={Test} />
            <Route path="/test_result" exact component={Test_result} />
            <Route path="/board/:page/:id" exact component={Board_view} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
