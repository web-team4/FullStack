import React from "react"
import "../css/comments.css"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Comments extends React.Component {
  //props: comment(작성자 id, 내용, 날짜 객체)
  state = {
    updateFlag: false,
    comment_content: this.props.comment.comment_content,
    user_name: this.props.comment.user_name,
    comment_date: this.props.comment.comment_date,
  }
  handleUpdate = (e) => {
    this.setState({ updateFlag: !this.state.updateFlag })
  }
  componentDidMount() {}
  update = async (e) => {
    e.preventDefault()
    let { comment_id } = this.props.comment
    await Axios.post(`comment/update/${comment_id}`, { data: e.target[0].value }).then((res) => {
      if (res.data.update) {
        alert("댓글이 수정되었습니다")
        this.setState({ updateFlag: false, comment_content: e.target[0].value })
      } else {
        alert("수정 실패")
      }
    })
  }
  Delete = (e) => {
    if (window.confirm("댓글을 삭제 하시겠습니까?")) {
      let { comment_id } = this.props.comment
      Axios.post("/comment/delete", { comment_id }).then((res) => {
        if (res.data.success) {
          alert("댓글이 삭제 되었습니다")
          window.location.reload()
        } else {
          alert("댓글 삭제 실패")
        }
      })
    }
  }
  render() {
    return (
      <div className="comment">
        <div className="title">
          <span className="name"> {this.state.user_name}</span>
          <span className="date">
            {"("}
            {this.state.comment_date}
            {")"}
          </span>
          {this.props.loginName === this.state.user_name && (
            <span className="control">
              <button className="update" onClick={(e) => this.handleUpdate(e)}>
                {this.state.updateFlag ? "취소" : "수정"}
              </button>
              <button className="delete" onClick={(e) => this.Delete(e)}>
                X
              </button>
            </span>
          )}
        </div>

        <span className="comment_line" />
        {this.state.updateFlag ? (
          <div className="updateText">
            <form onSubmit={(e) => this.update(e)}>
              <textarea
                name="comment_text"
                id=""
                cols="30"
                rows="10"
                defaultValue={this.state.comment_content}
              ></textarea>
              <button type="submit">완료</button>
            </form>
          </div>
        ) : (
          <div className="content">{this.state.comment_content}</div>
        )}
      </div>
    )
  }
}

export default Comments
