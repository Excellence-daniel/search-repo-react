import React from "react";
import ReactDOM from "react-dom";
import './bootstrap.css'

import DisplayTable from './components/displayTable';
import {apiGetter} from './components/getRepoApi';
//components

import axios from 'axios'
import {AsyncStorage} from "AsyncStorage"
import {DebounceInput} from 'react-debounce-input';
//npm installed libraries

        export class SearchRepo extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              repoNameSearched: "",
              rePoList: [],
              perPage: 5,
              currentPage: 1,
              btnDisplay: 'none',
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
            if ((localStorage.getItem("repoData")).length > 2){
              this.setState({ rePoList: JSON.parse(localStorage.getItem("repoData")), btnDisplay : '' });
              //sets the state rePoList[] to the list in the localStorage and make button display
            } else {
              this.setState({btnDisplay: 'none'})
              //display nothing in the table and also set display for pagination (back and next) buttons to be none
            }
          }

          perPageNum(e) {
            var pageno = e.target.value;
            this.setState({ perPage: pageno });
          }

          async changeSearchVal(e) {
            var inputVal = e.target.value;
            this.setState({ repoNameSearched: inputVal });
            if (inputVal){
             const resp = await apiGetter(inputVal)
             this.setState({
               rePoList: resp.data.items
             });
              //gets the called data from the imported function 'apiGetter' and sets states rePoList and rep
             if (resp.data.total_count > 0){
               //if any data is gotten from the api, save in localStorage and AsyncStorage as a persistence mechanism and activate display of buttons
             localStorage.setItem("repoData", JSON.stringify(resp.data.items));
             AsyncStorage.setItem("repoValue", JSON.stringify(resp.data.items));
             this.setState({btnDisplay: ''})
           } else {
             //if no data is gotten from the API, deactivate display of the pagination (back and next) buttons
                this.setState({btnDisplay: 'none'})
           }

          }
        }

          async onClickSearch(){
            var inputVal = this.state.repoNameSearched
              if (inputVal === ''){
                alert ("You have to input a Repo Name to be searched")
                  //display this is button is clicked to fecth data and no text is in the textbox
              } else {
                  const resp = await apiGetter(inputVal)
                  this.setState({
                    rePoList: resp.data.items
                  });
                  if (resp.data.total_count > 0){
                    localStorage.setItem("repoData", JSON.stringify(resp.data.items));
                    AsyncStorage.setItem("repoValue", JSON.stringify(resp.data.items));
                    this.setState({btnDisplay: ''})
                  //store fetched data in localStorage and AsyncStorage for persistence and also display pagination buttons if data is gotten from the API
                } else {
                    this.setState({btnDisplay: 'none'})
                      //set button display to none
                }
            }
          }

          nextBtn() {
            var currPage = this.state.currentPage;
            var repos = this.state.rePoList;
            console.log("Len: " + repos.length);
            var pagesNum = Math.ceil(repos.length / this.state.perPage);
            //for pagination, length of array / number of data to be displayed on a page
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
            k+=1
            let arrayCopy = this.state.rePoList;
            arrayCopy.sort(this.compareBy(key));
            this.setState({ rePoList: arrayCopy, count: k });
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
                  <DebounceInput
                    className="form-control"
                    debounceTimeout={500}
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
                  btnDisplay = {this.state.btnDisplay}
                  nextBtn={this.nextBtn}
                  sortBy={this.sortBy}
                />
              </div>
            );
          }
        }
