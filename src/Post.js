import React from 'react';
import './App.css';
import axios from 'axios';

let strGET = (window.location.search.replace( '?', '')),
    id = strGET.substr(3);



class Post extends React.Component {

  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  state = {
    image: strGET.substr(3),
    comments: []
  }

  componentDidMount() {

  	axios({
	  method:'get',
	  url: ('https://api.imgur.com/3/gallery/'+ id +'/comments'),
    headers: { 'authorization': 'Client-ID 89929a98873902c' }
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
        <div>
           <button
            className="button icon-left"
            onClick={this.context.router.history.goBack}>
              Back
          </button> 
        </div>
      	<div>
           <img key={this.state.image} src={(`https://i.imgur.com/${this.state.image}.jpg`)} />
    
  		    <ul>
  		        { this.state.comments.map(comment =>
  		        <li key={comment.id}><h3>{comment.author}</h3>{comment.comment}</li>)}

  		    </ul>
        </div>
      </div>
    )
  }
}

export default Post;