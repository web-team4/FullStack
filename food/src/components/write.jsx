import React from "react"
import "../css/write.css"
import write1 from "../images/boardLogo.png"
import { withRouter, Link } from "react-router-dom"

class Write extends React.Component {
  componentDidMount() {
    if (!this.props.possible) {
      alert("로그인이 필요합니다!")
      this.props.history.push("/login")
    }
  }
  render() {
    return this.props.possible ? (
      <div className="write">
        <div className="subtitle">
          <ul>
            <li>
              <img src={write1} alt="" />
            </li>
            <li>
              <h2>게시판</h2>
            </li>
          </ul>
        </div>
        <div className="subline"></div>
        <form className="box">
          <ul>
            <li>제목</li>
            <li>
              <input type="text" className="enter1" name="title" />
            </li>
            <li>
              첨부파일
              <input type="button" className="file" value="파일 선택" />
            </li>
            <li>내용</li>
            <li>
              <input type="text" className="enter2" name="text" />
            </li>
          </ul>
          <div className="button">
            <input type="submit" value="글 작성" />
            <Link to={{ pathname: `/board/page${this.props.location.state.prevPage}` }}>
              <input type="button" value="취소" />
            </Link>
          </div>
        </form>
      </div>
    ) : null
  }
}
export default withRouter(Write)
