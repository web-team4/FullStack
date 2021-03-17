import React from "react"
import "../css/comments.css"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Comments extends React.Component {
  //props: comment(작성자 id, 내용, 날짜 객체)
  update = (e) => {}
  delete = (e) => {
    if (window.confirm("댓글을 삭제 하시겠습니까?")) {
    }
  }
  render() {
    let { user_name, comment_content, comment_date, comment_id } = this.props.comment
    return (
      <div className="comment">
        <div className="title">
          <span className="name"> {user_name}</span>
          <span className="date">
            {"("}
            {comment_date}
            {")"}
          </span>
          {this.props.loginName === user_name && (
            <span className="control">
              <button className="update" onClick={(e) => this.update(e)}>
                수정
              </button>
              <button className="delete" onClick={(e) => this.delete(e)}>
                X
              </button>
            </span>
          )}
        </div>

        <span className="comment_line" />
        <div className="content">{comment_content}</div>
      </div>
    )
  }
}

export default Comments
