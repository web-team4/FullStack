import React from "react"
import "../css/board_view.css"
import { withRouter, Link } from "react-router-dom"
import Comments from "./comments.jsx"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Board_view extends React.Component {
  state = {
    id: this.props.match.params.id,
    writer: "",
    date: 0,
    title: "",
    view: 0,
    like: 0,
    content: "",
    flag: false,
    comment: [],
    nickName: "",
    prevLink: 1,
  }
  componentDidMount() {
    Axios.post("/detail", { board_id: this.state.id }).then((res) => {
      let temp = {}
      for (let [name, value] of Object.entries(res.data)) temp[name] = value
      this.setState(temp)
    })
    Axios.post("/").then((res) => {
      this.setState({ nickName: res.data.nickName })
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].value !== "") {
      let temp = { comment_content: e.target[0].value }

      Axios.post(`/comment/${this.state.id}`, temp)
        .then((res) => {
          if (res.data.login) {
            alert("댓글이 작성되었습니다!")
            //this.setState({ ...this.state })
            window.location.reload()
          } else alert("로그인 후 이용해 주세요")
        })
        .catch((err) => console.log(err))
    } else {
      alert("내용을 입력해 주세요")
    }
  }
  update = (e) => {
    if (window.confirm("게시글을 수정 하시겠습니까?")) {
      this.props.history.push({
        pathname: "/write",
        state: {
          title: this.state.title,
          content: this.state.content,
          update: true,
          id: this.state.id,
          prevUrl: this.state.prevLink,
        },
      })
    }
  }
  delete = (e) => {
    if (window.confirm("게시글을 삭제 하시겠습니까?")) {
      Axios.post(`/delete/${this.state.id}`).then((res) => {
        if (res.data.success) {
          alert("게시글이 삭제 되었습니다")

          this.props.history.push(`/board/page${this.state.prevLink}`)
        } else {
          alert("게시글 삭제 실패")
        }
      })
    }
  }
  render() {
    return (
      <div className="board_view">
        <div className="text">
          <h3 className="imageTitle">자유 게시판</h3>
          <h5 className="imageText">
            로그인 후, 심리테스트 결과 및 인하대학교 후문
            <br />
            맛집에 대하여 자유롭게 이야기를 나눌 수 있는 게시판입니다.
          </h5>
        </div>

        <div className="title">
          <h1>{this.state.title}</h1>
          <ul>
            <li>작성자</li>
            <li className="control">{this.state.writer}</li>
            <li>작성일</li>
            <li className="control">{this.state.date}</li>
            <li>조회수</li>
            <li className="control">{this.state.view}</li>
            <li>좋아요</li>
            <li className="control">{this.state.like}</li>
            <li>댓글수</li>
            <li className="control">{this.state.comment.length}</li>
            {this.state.writer === this.state.nickName && (
              <li className="control_btns">
                <button className="update" onClick={(e) => this.update(e)}>
                  수정
                </button>
                <button className="delete" onClick={(e) => this.delete(e)}>
                  X
                </button>
              </li>
            )}
          </ul>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: this.state.content,
          }}
        ></div>
        <div className="btns">
          <Link to={{ pathname: `/board/page${this.state.prevLink}` }}>
            <button className="prev">이전</button>
          </Link>

          <button className="next">다음</button>
          <div></div>
        </div>
        <div className="scroll">
          <div className="comments">
            <h2>댓글</h2>
            {this.state.comment.map((c, idx) => (
              <Comments key={idx} comment={c} loginName={this.state.nickName}></Comments>
            ))}
          </div>
          <div className="writeComment">
            <form className="write" onSubmit={(e) => this.handleSubmit(e)}>
              <textarea name="text" id="" cols="50" rows="6" wrap="hard"></textarea>
              <button type="submit">등록</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Board_view)
