import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
import AboutUsMarkdown from "./AboutUs.md";
import "../css/AboutUs.css";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentDidMount() {
    fetch(AboutUsMarkdown)
      .then((res) => res.text())
      .then((text) => {
        this.setState({ markdown: text });
      });
  }

  render() {
    const { markdown } = this.state;
    return (
      <div className="about_us_container">
        <Markdown children={markdown} />
      </div>
    );
  }
}

export { AboutUs };
