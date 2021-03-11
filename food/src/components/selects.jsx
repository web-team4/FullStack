import React from "react"
import "../css/inputs.css"

function Select({ name, up, handle }) {
  return (
    <div className="inputBox">
      <div className="topMessage">{up}</div>
      <div className="Box">
        <select
          name={name}
          onChange={(e) => {
            handle(e)
          }}
        >
          <option value="질문 1" selected>
            질문 1
          </option>
          <option value="질문 2">질문 2</option>
          <option value="질문 3">질문 3</option>
        </select>
      </div>
    </div>
  )
}

export default Select
