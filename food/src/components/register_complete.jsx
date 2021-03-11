import React from "react"
import "../css/register_complete.css"
import { Link } from "react-router-dom"
import homeimg from "../images/home.PNG"

class Complete extends React.Component {
  render() {
    return (
      <div className="complete_all">
        <div className="helper"></div>
        <div className="text">
          <h1>Complete!</h1>
          <p>
            회원가입이 정상적으로 완료되었습니다. <br />
            이제 Bridge.inha의 모든 서비스를 자유롭게 이용하실 수 있습니다.
          </p>
        </div>
        <div className="toHome">
          <Link to="/">
            <img src={homeimg} alt="" />
            <h1>메인 화면으로</h1>
          </Link>
        </div>
      </div>
    )
  }
}
export default Complete
