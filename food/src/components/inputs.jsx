import React, { useState } from "react"
import "../css/inputs.css"
import Axios from "axios"
Axios.defaults.withCredentials = true

function Input({ name, placeholder, message, type, up, handle, pw = "", pwc = "" }) {
  const [text, setText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const changePossible = (e, p) => {
    let version = p ? true : false
    handle(e, version)
  }
  const handleChange = (e) => {
    setText(e.target.value)
    if (e.target.value === "") {
      setErrorMessage(message)
      //if(e.target.name!=="id" && e.target.name!=="password")
      //changePossible(false)
    } else {
      setErrorMessage("")
      if (e.target.name !== "id" && e.target.name !== "password") handle(e)
    }
  }
  return (
    <div className="inputBox">
      <div className="topMessage">{up}</div>
      <div className="Box">
        <input
          size="50"
          type={type}
          name={name}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            handleChange(e)
          }}
          onBlur={(e) => {
            if (e.target.name === "_id") {
              Axios.post("/auth/check_id", { id: e.target.value }).then((res) => {
                if (res.data.id_check) {
                  setErrorMessage("중복된 아이디에요!")
                  changePossible(e, false)
                } else {
                  changePossible(e, true)
                }
              })
            } else if (e.target.name === "passwordCheck") {
              if (e.target.value !== pw) {
                setErrorMessage("비밀번호가 달라요!")
                changePossible(e, false)
              } else {
                setErrorMessage("")
                changePossible(e, true)
              }
            } else if (e.target.name === "_password") {
              if (e.target.value !== pwc) changePossible(e, false)
              else changePossible(e, true)
            } else if (e.target.name === "nickName") {
              Axios.post("/auth/check_user_nickname", { nickname: e.target.value }).then((res) => {
                if (res.data.nickname_check) {
                  setErrorMessage("중복된 닉네임이에요!")
                  changePossible(e, false)
                } else {
                  changePossible(e, true)
                }
              })
            }
          }}
        />
      </div>
      <div className="message">{errorMessage}</div>
    </div>
  )
}

export default Input
