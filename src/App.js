import React from "react";
import "./App.css";
import Button from "./Components/Button.js";
import Quote from "./Components/Quote.js";
import Search from "./Components/Search.js";

class App extends React.Component {
  state = {
    quotes: [],
    searchWord: ""
  };

  componentDidMount() {
    this.randomQuote();
  }

  randomQuote = () => {
    fetch("https://kadir-quotes-app.glitch.me/quotes/random")
      .then(res => res.json())
      .then(json => {
        this.setState({
          quotes: [json]
        });
      });
  };

  handleChange = event => {
    this.setState({
      searchWord: event.target.value
    });
  };

  search = () => {
    fetch(
      `https://kadir-quotes-app.glitch.me/quotes/search?word=${
        this.state.searchWord
      }`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          quotes: json
        });
      });
  };

  displayQuotes = () => {
    fetch("https://kadir-quotes-app.glitch.me/quotes/")
      .then(res => res.json())
      .then(json =>
        this.setState({
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
        <div>
          <Search
            search={this.search}
            searchWord={this.searchWord}
            handleChange={this.handleChange}
          />
          <Button handleClick={this.search} content="Search" />
        </div>

        {!this.state.quotes.length
          ? "Loading...."
          : this.state.quotes.map(quote => {
              return <Quote quote={quote} />;
            })}
      </div>
    );
  }
}

export default App;
