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
            <button className="button twitter" style={{ backgroundColor: '#1da1f2' }} onClick={tweetQuote} href='#' id="tweet-quote" title="Tweet this quote!" target='null' rel="noopener noreferrer">
              <svg className="fa fa-twitter" xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="button tumblr" onClick={tumblrQuote} href='#' id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" rel="noopener noreferrer">
              <svg className='fa fa-tumblr' xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24"><path d="M19.512 17.489l-.096-.068h-3.274c-.153 0-.16-.467-.163-.622v-5.714c0-.056.045-.101.101-.101h3.82c.056 0 .101-.045.101-.101v-5.766c0-.055-.045-.1-.101-.1h-3.803c-.055 0-.1-.045-.1-.101v-4.816c0-.055-.045-.1-.101-.1h-7.15c-.489 0-1.053.362-1.135 1.034-.341 2.778-1.882 4.125-4.276 4.925l-.267.089-.068.096v4.74c0 .056.045.101.1.101h2.9v6.156c0 4.66 3.04 6.859 9.008 6.859 2.401 0 5.048-.855 5.835-1.891l.157-.208-1.488-4.412zm.339 4.258c-.75.721-2.554 1.256-4.028 1.281l-.165.001c-4.849 0-5.682-3.701-5.682-5.889v-7.039c0-.056-.045-.101-.1-.101h-2.782c-.056 0-.101-.045-.101-.101l-.024-3.06.064-.092c2.506-.976 3.905-2.595 4.273-5.593.021-.167.158-.171.159-.171h3.447c.055 0 .101.045.101.101v4.816c0 .056.045.101.1.101h3.803c.056 0 .101.045.101.1v3.801c0 .056-.045.101-.101.101h-3.819c-.056 0-.097.045-.097.101v6.705c.023 1.438.715 2.167 2.065 2.167.544 0 1.116-.126 1.685-.344.053-.021.111.007.13.061l.995 2.95-.024.104z" fillRule="evenodd" clipRule="evenodd"/></svg>
            </button>
            <button className="button" id="new-quote" style={{ backgroundColor: colors[randomColor] }} onClick={getRandomQuote}>New quote</button>
          </div>
        </div>
      </div>
    )
  }
};

export default QuoteBox
