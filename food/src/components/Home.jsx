import React from "react"
import "../css/Home.css"
import Axios from "axios"
import { Link } from "react-router-dom"
Axios.defaults.withCredentials = true

class Home extends React.Component {
  componentDidMount() {
    Axios.post("/")
      .then((res) => {
        this.props.change("id", res.data.id)
        this.props.change("nickName", res.data.nickName)
        this.props.change("loginCheck", res.data.loginCheck)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="Home">
        <div className="image1"></div>
        <div className="inner1">
          <h2>
            그때 그때, <br />
            나에게 맞는 인후 맛집
          </h2>
          <span></span>
          <h4>심리테스트를 통해 결정하다.</h4>
          <Link to="/test">
            {">"}&nbsp;{">"} &nbsp;테스트 하러가기
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
