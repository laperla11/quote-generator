import React from "react";
import "./App.css";
import Button from "./Components/Button.js";
import Quote from "./Components/Quote.js";
import Search from "./Components/Search.js";

class App extends React.Component {
  state = {
    quotes: [],
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
          quotes: [json]
        });
      });
  };

  handleChange = event => {
    this.setState({
      searchWord: event.target.value
    });
  };

  search = keyWord => {
    fetch(`https://kadir-quotes-app.glitch.me/quotes/search?word=${keyWord}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          quotes: json
        });
      });
  };

  displayQuotes = () => {
    fetch("https://kadir-quotes-app.glitch.me/quotes/")
      .then(res => res.json())
      .then(json =>
        this.setState({
          isLoading: false,
          quotes: json
        })
      );
  };

  render() {
    return (
      <div className="App">
        <h1>Quote Generator</h1>
        <Button handleClick={this.displayQuotes} content="Show Quotes" />
        <Button handleClick={this.randomQuote} content="Random" />
        <Search search={this.search} />
        {this.state.isLoading ? (
          "Loading...."
        ) : this.state.quotes.length > 0 ? (
          this.state.quotes.map(quote => {
            return <Quote quote={quote} />;
          })
        ) : (
          <p style={paraStyle}>no results found</p>
        )}
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
