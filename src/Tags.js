import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tags extends React.Component {
   state = {
    tags: [],
    isOpened: false
  }

  toggleState() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  componentDidMount() {
    axios.get('https://api.imgur.com/3/tags')
      .then(result => {
        const tagsAll = result.data.data.tags;
        const tags = tagsAll.slice(0, 21);
        this.setState({ tags });
      })
  }

  render() {
    let tagsItem;
    if (this.state.isOpened) {
      tagsItem =
      <ul>
        { this.state.tags.map(tag => <li key={tag.id}><a href={`/category?tag=${tag.name}`}>{tag.name}</a></li>)}
      </ul>
    }
    return (
      <div onClick={this.toggleState.bind(this)}>
       Tags
       {tagsItem}
       
      </div>
    )
  }
}

 ReactDOM.render(<Tags />, document.getElementById('tags'));



