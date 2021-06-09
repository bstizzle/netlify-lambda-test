import React, { useState, Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { gql, useQuery } from "@apollo/client";

const HELLO = gql`
  {
    hello
  }
`

const LambdaDemo = () => {
  const [loadingF, setLoadingF] = useState(false)
  const [msg, setMsg] = useState(null)
  const { loading, error, data } = useQuery(HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleClick = api => e => {
    e.preventDefault()

    setLoadingF(true)
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => {
        setLoadingF(false)
        setMsg(json.msg)
      })
  }

  const handleGraphql = (e) => {
    e.preventDefault();


  }

  return (
    <p>
      <button onClick={handleClick("hello")}>{loadingF ? "Loading..." : "Call Lambda"}</button>
      <button onClick={handleClick("async-dadjoke")}>{loadingF ? "Loading..." : "Call Async Lambda"}</button>
      <button onClick={handleGraphql}>{loading ? "Loading..." : [data]}</button>
      <br />
      <span>{msg}</span>
    </p>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
