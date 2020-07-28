import React, { Component } from "react";
// import ReactMarkdown from 'react-markdown';
import Markdown from "markdown-to-jsx";
import MethodologyMarkdown from "./Methodology.md";

class Methodology extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentDidMount() {
    fetch(MethodologyMarkdown)
      .then((res) => res.text())
      .then((text) => {
        this.setState({ markdown: text });
      });
  }

  render() {
    const { markdown } = this.state;
    return (
      <div className="methodology_container">
        <Markdown children={markdown} />
      </div>
    );
  }
}

export { Methodology };
