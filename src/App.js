import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tags from './Tags';
import axios from 'axios';

var ex = axios({
    method: 'get',
    url: 'https://api.imgur.com/3/gallery/hot/viral/0.json'
});
console.log(ex);

export default class App extends Component {
    render() {
        return (
            <div>
                
                <ul>
                    
                    
                </ul>

                {this.props.children}
            </div>
        )
    }
}

