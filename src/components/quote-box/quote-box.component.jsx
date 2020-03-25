import React from 'react'
import './quote-box.styles.scss'

class QuoteBox extends React.Component {
  constructor () {
    super()
    this.state = {
      quotes: []
    }
  }

  componentDidMount () {
    fetch('https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(res => this.setState({
        quotes: res.quotes
      }))
  }

  render () {
    const { quotes } = this.state
    const randomRes = Math.floor(Math.random() * quotes.length)
    console.log(quotes.map(item => item.quote)[randomRes])
    console.log(quotes.map(item => item.author)[randomRes])

    return (
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left">`&quot;`</i><span id="text">{quotes.map(item => item.quote)[0]}</span>
          </div>
          <div className="quote-author">
          - <span id="author">{quotes.map(item => item.author)[0]}</span>
          </div>
          <div className="buttons">
            <button className="button" id="new-quote">New quote</button>
          </div>
        </div>
      </div>
    )
  }
};

export default QuoteBox
