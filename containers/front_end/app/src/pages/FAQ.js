import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
import FAQMarkdown from "./FAQ.md";

class FAQ extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentDidMount() {
    fetch(FAQMarkdown)
      .then((res) => res.text())
      .then((text) => {
        this.setState({ markdown: text });
      });
  }

  render() {
    const { markdown } = this.state;
    return (
      <div className="faq_container">
        <Markdown children={markdown} />
      </div>
    );
  }
}

export { FAQ };
