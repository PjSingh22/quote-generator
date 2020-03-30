import React from 'react'
import './quote-box.styles.scss'

class QuoteBox extends React.Component {
  constructor () {
    super()
    this.state = {
      quotes: [],
      currentQuote: '',
      currentAuthor: ''
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

    const body = document.getElementById('body').style.backgroundColor = colors[randomColor]

    const randomRes = Math.floor(Math.random() * quotes.length)

    const openURL = (url) => {
      window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0')
    }
    const tweetQuote = () => {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor))
    }

    const tumblrQuote = () => {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button')
    }
    const changeColors = () => {
      return colors[randomColor] && body
    }

    const getRandomQuote = () => {
      const theQuote = quotes.map(item => item.quote)[randomRes]
      const theAuthor = quotes.map(item => item.author)[randomRes]
      return this.setState({
        currentQuote: theQuote,
        currentAuthor: theAuthor
      }) && changeColors
    }

    return (
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left">`&quot;`</i><span id="text" style={{ color: colors[randomColor] }}>{currentQuote}</span>
          </div>
          <div className="quote-author">
          - <span style={{ color: colors[randomColor] }} id="author">{currentAuthor}</span>
          </div>
          <div className="buttons">
            <a className="button" onClick={tweetQuote} href='#' id="tweet-quote" title="Tweet this quote!" target='null' rel="noopener noreferrer">
              <i className="fa fa-twitter"></i>
            </a>
            <a className="button" onClick={tumblrQuote} href='#' id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-tumblr"></i>
            </a>
            <button className="button" id="new-quote" style={{ backgroundColor: colors[randomColor] }} onClick={getRandomQuote}>New quote</button>
          </div>
        </div>
      </div>
    )
  }
};

export default QuoteBox
