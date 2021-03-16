import React from "react"
import "../css/write.css"
import write1 from "../images/boardLogo.png"
import { withRouter, Link } from "react-router-dom"
import CKEditor from "ckeditor4-react"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Write extends React.Component {
  state = {
    data: "",
    title: "",
  }
  async componentDidMount() {
    await Axios.post("/")
      .then((res) => {
        this.props.change("id", res.data.id)
        this.props.change("nickName", res.data.nickName)
        this.props.change("loginCheck", res.data.loginCheck)
      })
      .catch((err) => {
        console.log(err)
      })
    if (!this.props.possible) {
      alert("로그인이 필요합니다!")
      this.props.history.push("/login")
    }
  }
  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData(),
    })
  }
  onTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }
  handleSubmit = (e) => {
    let url = "/add"
    e.preventDefault()
    if (!this.state.data || !this.state.title) {
      alert("내용을 입력해 주세요!")
    } else {
      let data = { board_title: this.state.title, board_content: this.state.data }
      Axios.post(url, data)
        .then((res) => {
          if (res.data.check) {
            alert("글이 작성되었습니다!")
            this.props.history.push("/board/page1")
          }
        })
        .catch((e) => console.log("실패", e))
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
        <form className="box" onSubmit={(e) => this.handleSubmit(e)}>
          <ul>
            <li>제목</li>
            <li>
              <input
                type="text"
                className="enter1"
                name="title"
                onChange={(e) => this.onTitleChange(e)}
              />
            </li>

            <li>내용</li>

            <li>
              <CKEditor onChange={this.onEditorChange} data={this.state.data} />
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
