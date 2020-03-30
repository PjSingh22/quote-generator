import React from 'react'
import './quote-box.styles.scss'

class QuoteBox extends React.Component {
  constructor () {
    super()
    this.state = {
      quotes: [],
      currentQuote: '',
      currentAuthor: '',
      color: null
    }
  }

  componentDidMount () {
    fetch('https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(res => this.setState({
        quotes: res.quotes,
        currentQuote: res.quotes.map(item => item.quote)[0],
        currentAuthor: res.quotes.map(item => item.author)[0]
      }))
  }

  render () {
    const { quotes, currentAuthor, currentQuote } = this.state

    const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857']
    const randomColor = Math.floor(Math.random() * colors.length)

    const randomRes = Math.floor(Math.random() * quotes.length)

    const divStyle = {
      '.text': colors[randomColor],
      button: colors[randomColor]
    }

    const getRandomQuote = () => {
      const theQuote = quotes.map(item => item.quote)[randomRes]
      const theAuthor = quotes.map(item => item.author)[randomRes]
      return this.setState({
        currentQuote: theQuote,
        currentAuthor: theAuthor,
        color: divStyle
      })
    }

    return (
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left">`&quot;`</i><span id="text">{currentQuote}</span>
          </div>
          <div className="quote-author">
          - <span id="author">{currentAuthor}</span>
          </div>
          <div className="buttons">
            <button className="button" id="new-quote" style={{ backgroundColor: colors[randomColor] }} onClick={getRandomQuote}>New quote</button>
          </div>
        </div>
      </div>
    )
  }
};

export default QuoteBox
