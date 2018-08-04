import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

let arr = Array.from({length: 20});
console.log(arr);

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class Scroll extends React.Component {
  state = {
    items: [1, 2, 3, 4, 5, 6, 7, 8, 1,1,1,1,1,1,99999999]
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      let add = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2222]
      this.setState({
        items: this.state.items.concat(add)
      });
    }, 4500);
  };

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={20}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={i} class={i}>
              div - #{i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default Scroll; 