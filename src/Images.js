import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  height: 400,
  width: 400
};

class Images extends React.Component {
  state = {
    imageId: [],
    add: [],
    page: 0
  }

  componentDidMount() {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0.json')
      .then(res => {
        let image = res.data.data;
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
        this.setState({ imageId });
      })
  }

  fetchMoreData = () => {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/' + this.state.page + '.json')
      .then(res => {
        let image = res.data.data;
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