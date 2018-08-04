import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

let strGET = (window.location.search.replace( '?', '')),
    id = strGET.substr(3);



class Post extends React.Component {
  state = {
    image: strGET.substr(3),
    comments: []
  }


  componentDidMount() {

  	axios({
	  method:'get',
	  url: ('https://api.imgur.com/3/gallery/'+ id +'/comments')
	})
      .then(resul => {
        const comments = resul.data.data;
        console.log(resul);
        this.setState({ comments });
      })
  }

  render() {
    return (
    	<div>
            <img key={this.state.image} src={(`https://i.imgur.com/${this.state.image}.jpg`)} />
  
		    <ul>
		        { this.state.comments.map(comment =>
		        <li key={comment.id}><h3>{comment.author}</h3>{comment.comment}</li>)}
		    </ul>
         </div>
    )
  }
}

export default Post;