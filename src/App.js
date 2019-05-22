import React from "react";
import "./App.css";
import Button from "./Components/Button.js";
import Quote from "./Components/Quote.js";
import Search from "./Components/Search.js";

class App extends React.Component {
  state = {
    quotes: [],
    error: false,
    errorMsg: "",
    noResults: false,
    isLoading: true
  };

  componentDidMount() {
    this.randomQuote();
  }

  randomQuote = () => {
    fetch("https://kadir-quotes-app.glitch.me/quotes/random")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          error: false,
          noResults: false,
          quotes: [json]
        });
      });
  };

  search = keyWord => {
    fetch(`https://kadir-quotes-app.glitch.me/quotes/search?term=${keyWord}`)
      .then(res => {
        if (res.status === 400) {
          this.setState({ error: true });
        }
        return res;
      })
      .then(res => res.json())
      .then(json => {
        json.msg
          ? this.setState({
              isLoading: false,
              noResults: false,
              error: true,
              errorMsg: json.msg
            })
          : json.length > 0
          ? this.setState({
              isLoading: false,
              noResults: false,
              error: false,
              quotes: json
            })
          : this.setState({ isLoading: false, noResults: true });
      });
  };

  displayQuotes = () => {
    fetch("https://kadir-quotes-app.glitch.me/quotes")
      .then(res => res.json())
      .then(json =>
        this.setState({
          isLoading: false,
          noResults: false,
          error: false,
          quotes: json
        })
      );
  };

  render() {
    const { isLoading, noResults, error, errorMsg, quotes } = this.state;
    return (
      <div className="App">
        <h1>Quote Generator</h1>
        <Button handleClick={this.displayQuotes} content="Show Quotes" />
        <Button handleClick={this.randomQuote} content="Random" />
        <Search search={this.search} />
        {error && <p style={paraStyle}>{errorMsg}</p>}
        {noResults && <p style={paraStyle}>No results found</p>}
        {isLoading
          ? "Loading...."
          : quotes.map(quote => {
              return <Quote quote={quote} />;
            })}
      </div>
    );
  }
}

const paraStyle = {
  border: "2px solid red",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px"
};

export default App;
