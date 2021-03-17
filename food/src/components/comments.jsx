import React from "react"
import "../css/comments.css"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Comments extends React.Component {
  //props: comment(작성자 id, 내용, 날짜 객체)

  render() {
    let { user_name, comment_content, comment_date } = this.props.comment
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
              <button className="update">수정</button>
              <button className="delete">X</button>
            </span>
          )}
        </div>

        <hr />
        <div className="content">{comment_content}</div>
      </div>
    )
  }
}

export default Comments
