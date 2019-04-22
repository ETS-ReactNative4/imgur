import React from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 700,
  width: 700
};

let strGET = (window.location.search.replace( '?', '')),
    tag = strGET.substr(4);
console.log(strGET);
let urlTag = "https://api.imgur.com/3/gallery/t/" + tag;
let url = "https://api.imgur.com/3/gallery/hot/viral/ + this.state.page + .json";

class Images extends React.Component {

  state = {
    imageId: [],
    add: [],
    page: 0
  }

  componentDidMount() {
    if (tag) {
      url = urlTag;
    } 
    console.log(url);
    axios({
      method: 'get',
      url: url,
      headers: { 'authorization': 'Client-ID 89929a98873902c' }
    }).then(res => {
        let image = res.data.data;
        if (tag) {
          image = res.data.data.items;
        } 
        let imageId = new Array;
        for (let i = 0; i < image.length; i++) {
          if (image[i].cover == undefined) {
            let imag = (image[i].id);
            imageId.push(imag);
          } 
        }
        console.log(res);

        for (let i = 0; i < image.length; i++) {
          if (image[i].cover != undefined) {
            let imag = (image[i].cover);
            imageId.push(imag);
          } 
        }
        this.setState({ imageId });
      })
  }

  fetchMoreData = () => {
    if (this.state.page == 0) {
      this.setState({page: 1});
    }
    url = 'https://api.imgur.com/3/gallery/hot/viral/' + this.state.page + '.json';
    if (tag) {
      url = 'https://api.imgur.com/3/gallery/t/' + tag + '/viral/' + this.state.page;
    }
    console.log(url);

    axios({
      method: 'get',
      url: url,
      headers: { 'authorization': 'Client-ID 89929a98873902c' }
    }).then(res => {
        let image = res.data.data;
        if (tag) {
          image = res.data.data.items;
        }
        let add = new Array;
        console.log(image);
        for (var i = 0; i < image.length; i++) {
          if (image[i].cover == undefined) {
            let imag = (image[i].id);
            add.push(imag);
          } 
        }

        for (var i = 0; i < image.length; i++) {
          if (image[i].cover !== undefined) {
            let imag = (image[i].cover);
            add.push(imag);
          } 
        } 
        console.log(this.state.page);
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
         <li><a href={`/post?id=${image}`}><img className='images' style={style} key={image} src={(`https://i.imgur.com/${image}_d.jpg`)} /></a></li>)}
          
      </ul>
      </InfiniteScroll>
    )
  }
}

export default Images;