import React from "react"
import "../css/board_view.css"
import board1 from "../images/coffee2.png"
import { withRouter, Link } from "react-router-dom"
class Board_view extends React.Component {
  render() {
    if (this.props.location.state === undefined) this.props.history.push("/")
    return this.props.location.state ? (
      <div className="board_view">
        <div className="image">
          <img src={board1} alt="" />
        </div>
        <h3 className="imageTitle">자유 게시판</h3>
        <h5 className="imageText">
          로그인 후, 심리테스트 결과 및 인하대학교 후문
          <br />
          맛집에 대하여 자유롭게 이야기를 나눌 수 있는 게시판입니다.
        </h5>
        <div className="title">
          <h1>{this.props.location.state.title}</h1>
          <ul>
            <li>작성자</li>
            <li className="control">{this.props.location.state.writer}</li>
            <li>작성일</li>
            <li className="control">{this.props.location.state.date}</li>
            <li>조회수</li>
            <li className="control">{this.props.location.state.view}</li>
          </ul>
        </div>
        <div className="description">{this.props.location.state.des}</div>
        <div className="btns">
          <Link to={{ pathname: `/board/page${this.props.location.state.prevPage}` }}>
            <button className="prev">이전</button>
          </Link>

          <button className="next">다음</button>
        </div>
      </div>
    ) : null
  }
}

export default withRouter(Board_view)
