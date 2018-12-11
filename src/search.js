import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./search.css"

import {AsyncStorage} from "AsyncStorage"
import DisplayTable from './components/displayTable';

export class SearchRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearched: "",
      rePoList: [],
      perPage: 5,
      currentPage: 1,
      count: 0
    };
    this.changeSearchVal = this.changeSearchVal.bind(this);
    this.perPageNum = this.perPageNum.bind(this)
    this.sortBy = this.sortBy.bind(this);
    this.compareBy.bind(this);
    this.nextBtn = this.nextBtn.bind(this)
    this.backBtn = this.backBtn.bind(this)
  }

  componentWillMount() {
    if (localStorage.getItem("repoData")){
      this.setState({ rePoList: JSON.parse(localStorage.getItem("repoData")) });
      //sets the state rePoList[] to the list in the localStorage
    }
  }

  changeSearchVal(e) {
    var inputVal = e.target.value;
    this.setState({ valueSearched: inputVal });
    if (inputVal){
     axios
    .get(`https://api.github.com/search/repositories?q=${inputVal}`)
    .then(resp => {
      console.log(resp.data.total_count);
      this.setState({
        rePoList: resp.data.items,
        rePoListLength: resp.data.total_count
      });
      localStorage.setItem("repoData", JSON.stringify(resp.data.items));
      AsyncStorage.setItem("repoValue", JSON.stringify(resp.data.items))
        .then(() => {
          console.log("It was saved successfully");
        })
        .catch(() => {
          console.log("There was an error saving the product");
        });
    });
  }
}
  nextBtn() {
    var currPage = this.state.currentPage;
    var repos = this.state.rePoList;
    console.log("Len: " + repos.length);
    var pagesNum = Math.ceil(repos.length / this.state.perPage);
    if (!(currPage === pagesNum || repos.length === 0)) {
      var newPage = currPage + 1;
      this.setState({ currentPage: newPage });
    }
  }

  backBtn() {
    var repos = this.state.rePoList;
    var currPage = this.state.currentPage;
    if (!(currPage <= 1 || repos.length === 0)) {
      var newPage = currPage - 1;
      this.setState({ currentPage: newPage });
    }
  }

  compareBy(key) {
    var count = this.state.count;
    return function(a, b) {
      if (count % 2 === 0) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
      } else {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    };
  }
  sortBy(key) {
    var k = this.state.count;
    this.setState({ count: ++k });
    let arrayCopy = this.state.rePoList;
    arrayCopy.sort(this.compareBy(key));
    this.setState({ rePoList: arrayCopy });
  }

  perPageNum(e) {
    var pageno = e.target.value;
    this.setState({ perPage: pageno });
  }
  onClickSearch(){
    var val = this.state.valueSearched
      //alert(val)
      if (val === ''){
        alert ("You have to input a Repo Name to be searched")
      } else{
  axios
    .get(`https://api.github.com/search/repositories?q=${val}`)
    .then(resp => {
      console.log(resp.data.total_count);
      this.setState({
        rePoList: resp.data.items,
        rePoListLength: resp.data.total_count
      });
      localStorage.setItem("repoData", JSON.stringify(resp.data.items));
      AsyncStorage.setItem("repoValue", JSON.stringify(resp.data.items))
        .then(() => {
          console.log("It was saved successfully");
        })
        .catch(() => {
          console.log("There was an error saving the product");
        });
    });
}
}

  render() {
    var indexOfLastTodo = this.state.currentPage * this.state.perPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.perPage;
    console.log(
      "Page " +
        this.state.currentPage +
        ", Last Todo: " +
        indexOfLastTodo +
        ", First Todo: " +
        indexOfFirstTodo
    );
    const repoArray = this.state.rePoList;
    var repoList = repoArray.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div>
      <h2><center> Search Repo React App </center></h2>
        <div className="col-md-12 normalize">
          <input
            className="form-control"
            placeholder="Search Repo"
            onChange={this.changeSearchVal}
            type="text" 
          />
          <center><button className = "btn" style = {{marginTop: '1%'}}onClick = {this.onClickSearch.bind(this)}> Search </button></center>
        </div>

        <DisplayTable
          perPageNum={this.perPageNum}
          searchval={this.state.searchval}
          repoList={repoList}
          backBtn={this.backBtn}
          nextBtn={this.nextBtn}
          sortBy={this.sortBy}
        />
      </div>
    );
  }
}
