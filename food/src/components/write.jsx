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
    if (this.props.location.state && !this.props.location.state.update) {
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
    } else if (this.props.location.state) {
      this.setState({
        title: this.props.location.state.title,
        data: this.props.location.state.content,
      })
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
    e.preventDefault()
    if (!this.props.location.state.update) {
      let url = "/add"

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
    } else {
      let { id } = this.props.location.state
      if (!this.state.data || !this.state.title) {
        alert("내용을 입력해 주세요!")
      } else {
        Axios.post("/update", {
          board_id: id,
          board_title: this.state.title,
          board_content: this.state.data,
        }).then((res) => {
          if (res.data.update) {
            alert("게시글이 수정되었습니다")
            let url = `/board/page${this.props.location.state.prevUrl}/${id}`
            this.props.history.push(url)
          } else {
            alert("수정 오류 발생")
          }
        })
      }
    }
  }
  render() {
    var url
    if (this.props.location.state === undefined) {
      this.props.history.push("/board/page1")
    } else {
      url = this.props.location.state.update
        ? this.props.location.state.prevUrl
        : this.props.location.state.prevPage
    }

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
                value={this.state.title}
              />
            </li>

            <li>내용</li>

            <li>
              <CKEditor
                onChange={this.onEditorChange}
                data={this.state.data}
                value={this.state.data}
              />
            </li>
          </ul>
          <div className="button">
            <input type="submit" value="글 작성" />
            <Link to={{ pathname: `/board/page${url}` }}>
              <input type="button" value="취소" />
            </Link>
          </div>
        </form>
      </div>
    ) : null
  }
}
export default withRouter(Write)
