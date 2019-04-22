import React from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

let strGET = (window.location.search.replace( '?', '')),
    tag = strGET.substr(4);

const style = {
  height: 500,
  width: 500
};

class Category extends React.Component {
  state = {
    imageId: [],
    comments: [],
    add: [],
    page: 0
  }

  componentDidMount() {

  	axios({
  	  method:'get',
  	  url: ('https://api.imgur.com/3/gallery/t/' + tag),
      headers: { 'authorization': 'Client-ID 89929a98873902c' }
  	}).then(res => {
        let image = res.data.data.items;
        console.log(res);
        let imageId = new Array;
        for (var i = 0; i < image.length; i++) {
          if (image[i].cover == undefined) {
            let imag = (image[i].id);
            imageId.push(imag);
          } 
        }

        for (var i = 0; i < image.length; i++) {
          if (image[i].cover != undefined) {
            let imag = (image[i].cover);
            imageId.push(imag);
          } 
        }
        console.log(imageId[0]); 
        this.setState({ imageId });
      })
  }

  fetchMoreData = () => {
    if (this.state.page == 0) {
      this.setState({page: 1});
    }
    axios({
      method:'get',
      url: 'https://api.imgur.com/3/gallery/t/' + tag + '/viral/' + this.state.page,
      headers: { 'authorization': 'Client-ID 89929a98873902c' }
    }).then(res => {
        let image = res.data.data.items;
        let add = new Array;
        console.log(image);
        for (var i = 0; i < image.length; i++) {
          if (image[i].cover == undefined) {
            let imag = (image[i].id);
            add.push(imag);
          } 
        }

        for (var i = 0; i < image.length; i++) {
          if (image[i].cover != undefined) {
            let imag = (image[i].cover);
            add.push(imag);
          } 
        }
        console.log(add[0]); 
        this.setState({ add });
      })

    setTimeout(() => {
      this.setState({
        imageId: this.state.imageId.concat(this.state.add),
        page: this.state.page + 1,
      });
    }, 1500);
  };

  render() {
    return (
        <InfiniteScroll
          dataLength={this.state.imageId.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
  
      <ul>
        { this.state.imageId.map(image =>
         <li><a href={`/post?id=${image}`}><img key={image} style={style} src={(`https://i.imgur.com/${image}_d.jpg`)} /></a></li>)}
          
      </ul>
      </InfiniteScroll>
    )
  }
}

export default Category;