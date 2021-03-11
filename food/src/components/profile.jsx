import React from "react"
import "../css/profile.css"
import { withRouter, Link } from "react-router-dom"
import peopleimg from "../images/profile_people.PNG"

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickName: "test",
      testResult: "testResult",
    }
    this.change()
  }
  change = () => {
    this.setState((state) => {
      return {
        nickName: "test",
        testResult: "testResult",
      }
    })
  }
  componentDidMount() {
    if (!this.props.possible) {
      alert("로그인이 필요합니다!")
      this.props.history.push("/login")
    }
  }
  render() {
    return this.props.possible ? (
      <div className="profile_all">
        <div className="title">
          <img src={peopleimg} alt="" width="48px" />
          <h1>내 정보</h1>
        </div>
        <div className="text">
          <div className="box">
            <h1>yerin65</h1>님 <br />
            안녕하세요! 내 정보 메뉴는 <br />
            회원가입 시 입력하신 닉네임과 심리테스트 결과를 확인하실 수 있습니다.
          </div>
        </div>
        <div className="result">
          <p className="heads">닉네임</p>
          <input type="text" className="box" value={this.state.nickName} disabled />
          <p className="heads">테스트 결과</p>
          <input type="text" className="box" value={this.state.testResult} disabled />
        </div>
        <div className="gotest">
          <Link to="/test">
            <p className="message">오늘의 결과가 궁금하다면?</p>
            <button className="btn">테스트 하러가기</button>
          </Link>
        </div>
      </div>
    ) : null
  }
}
export default withRouter(Profile)
