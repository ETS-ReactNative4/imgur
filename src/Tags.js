import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';

const style= {
  position: 'absolute',
  backgroundColor: '#D3D3D3',
}
class Tags extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      isOpened: true
    }
  }

  toggleState() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  componentDidMount = () => {
    this.setState({isOpened: !this.state.isOpened});
    axios({
        method: 'get',
        url: 'https://api.imgur.com/3/tags/',
        headers: { 'authorization': 'Client-ID 89929a98873902c' }
    }).then(result => {
        let tagsAll = result.data.data.tags;
        let tags = tagsAll.slice(0, 21);
       
        this.setState({ tags });
    }).catch(function(error) {
        console.log(error);
    });

  }

  render() {
    
    let tagsItem;

    if (this.state.isOpened) {
      tagsItem =
      <ul style={style}>
        { this.state.tags.map(tag => <li key={tag.id}><a href={`/category?tag=${tag.name}`}>{tag.name}</a></li>)}
      </ul>
       console.log(tagsItem);
    }
    console.log(tagsItem);
    return (
      <div onClick={this.componentDidMount}>
       Tags
       {tagsItem}
       
      </div>
    )
  }
}

 ReactDOM.render(<Tags />, document.getElementById('tags'));



