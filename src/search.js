import React from "react";
import ReactDOM from "react-dom";
import './bootstrap.css'

import DisplayTable from './components/displayTable';
import {apiGetter} from './components/getRepoApi';
import {styleInputs, divStyle, styleSelect} from './styles/styles'  //styles
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
              count: 0,
              usersName: '',
              pagesNum : null,
              textDisplay : 'none',
              nextBtnDisable : '',
              backBtnDisable : '',
              showLoader : 'none'
            };
            this.changeSearchVal = this.changeSearchVal.bind(this);
            this.perPageNum = this.perPageNum.bind(this)
            this.sortBy = this.sortBy.bind(this);
            this.compareBy.bind(this);
            this.nextBtn = this.nextBtn.bind(this)
            this.backBtn = this.backBtn.bind(this)
            this.userNameVal =  this.userNameVal.bind(this)
          }

          componentWillMount() {
            if (localStorage.getItem("repoData")){
              this.setState({ rePoList: JSON.parse(localStorage.getItem("repoData")), btnDisplay : '' });
              const pagesNum = Math.ceil(JSON.parse(localStorage.getItem("repoData")).length / this.state.perPage)
              this.setState({pagesNum, textDisplay : 'none'})
              //sets the state rePoList[] to the list in the localStorage and make pagination button display
              //also get how many pages the list has with regards to the number of repos displayed on a page, set it into a state and make textDisplay('Noresults') display to be none

            } else {
              this.setState({btnDisplay: 'none', textDisplay : ''})
              //display nothing in the table,  set display for pagination (back and next) buttons to be none and set Textdisplay to display 
            }
          }

          perPageNum(e) {
            var pageno = e.target.value; //get number selected from select dropdown
             const pagesNum = Math.ceil((this.state.rePoList).length / pageno) //get number of pages the list would have with regards to 'pageno'
            this.setState({ perPage: pageno, pagesNum , currentPage : 1 }); //set state and also make currentPage = 1
            
          }

          async changeSearchVal(e) {
            var inputVal = e.target.value;
            this.setState({ repoNameSearched: inputVal, showLoader : ''}); //onchange of the textbox, activate loader
            if (inputVal){
             const resp = await apiGetter(inputVal)
             //set result into state and stop loader 
             this.setState({
               rePoList: resp.data.items,
               showLoader : 'none'
             });

             const pagesNum = Math.ceil((this.state.rePoList).length / this.state.perPage) //get number of pages the list would have with regards to 'pageno'
             this.setState({pagesNum, currentPage : 1}) //set to state and set currentPage to 1 
             if ((this.state.rePoList).length > this.state.perPage){
               this.setState({nextBtnDisable : '', backBtnDisable : 'true'})  //for pagination, if repoList.length > perPage, disable back btn and activate nextbtn
             } else {
               this.setState({nextBtnDisable : 'true', backBtnDisable : 'true'})//for pagination, if repoList.length <= perPage, disable both btns
             }


             if (resp.data.total_count > 0){
               //if any data is gotten from the api, save in localStorage and AsyncStorage as a persistence mechanism and activate display of buttons
             localStorage.setItem("repoData", JSON.stringify(resp.data.items));
             AsyncStorage.setItem("repoValue", JSON.stringify(resp.data.items));
             this.setState({btnDisplay: '', textDisplay : 'none'}) //set display of 'No results' to none and display pagination buttons
           } else {
             //if no data is gotten from the API, deactivate display of the pagination (back and next) buttons
                this.setState({btnDisplay: 'none', textDisplay : ''}) //if nothing is gotten back from the API, set the pagination btns display to none and display textDisplay

           }

         } else {
           this.setState({showLoader: 'none'})
         }
        }

        userNameVal(e){
          var usersname = e.target.value
            if (usersname){
            this.setState({usersName : usersname})
            //picks the git username of the user and saves in the state
          }
        }


          nextBtn() {
            var currPage = this.state.currentPage;
            var repos = this.state.rePoList;
            console.log("Len: " + repos.length);
            var pagesNum = Math.ceil(repos.length / this.state.perPage)
            //for pagination, length of array / number of data to be displayed on a page
            if (!(currPage === pagesNum || repos.length === 0)) {
              var newPage = currPage + 1;
              this.setState({ currentPage: newPage, backBtnDisable : '' }); //if currPage < pagesNum or repos.length is not 0, enable backbtn
            }else {
              this.setState({nextBtnDisable : 'true', backBtnDisable: ''}) //disable nextBtn and enable backbtn
            }
          }

          backBtn() {
            var repos = this.state.rePoList;
            var currPage = this.state.currentPage;
            if (!(currPage <= 1 || repos.length === 0)) {
              var newPage = currPage - 1;
              this.setState({ currentPage: newPage, nextBtnDisable : '', backBtnDisable: ''});//while currPage is not less than 1 or repos.length != 0, enable nextBtn and backBtn
            }else {
              this.setState({backBtnDisable : 'true', nextBtnDisable : ''})//disable backbtn and enable nextbtn
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
              <div class = "col-md-12">
              <p><center> <img src = "Github-Mark.png" class = "img-responsive" style = {{width: '7%'}}/> </center>
              <center><b> REPO SEARCH </b></center></p>
              <div class = "col-md-3"> </div>
              <div class = "col-md-6">
                <div class = "col-md-6" style = {divStyle}>
                  <DebounceInput
                      onChange={this.changeSearchVal}
                      type = "text"
                      class = "form-control"
                      placeholder="Repo Name..."
                      debounceTimeout={500}
                      style = {styleInputs}/>
                </div>

                <div class = "col-md-4" style = {divStyle}>
                  <input
                      class = "form-control"
                      onChange = {this.userNameVal}
                      placeholder="Github Username..."
                      type="text"
                      style = {styleInputs}/>
                </div>

                <div class = "col-md-2" style = {divStyle}>
                  <select
                    class = "form-control btn-success"
                    onChange={this.perPageNum}
                    style = {styleSelect}>
                  <option value="5"> 5 </option>
                  <option value="10"> 10 </option>
                  <option value="15"> 15</option>
                  <option value="20"> 20</option>
                  <option value="25"> 25</option>
                </select>
                </div>

              </div>
              <div class = "col-md-3"> </div>
              </div>

              <div style = {{marginTop: '2%'}}> </div>

                <DisplayTable
                  perPageNum={this.perPageNum}
                  searchval={this.state.searchval}
                  repoList={repoList}
                  usersName={this.state.usersName}
                  backBtn={this.backBtn}
                  btnDisplay = {this.state.btnDisplay}
                  nextBtn={this.nextBtn}
                  sortBy={this.sortBy}
                  pagesNum = {this.state.pagesNum}
                  currentPage = {this.state.currentPage}
                  textDisplay = {this.state.textDisplay}
                  backBtnDisable = {this.state.backBtnDisable}
                  nextBtnDisable = {this.state.nextBtnDisable}
                  showLoader = {this.state.showLoader}
                />
                </div>
            );
          }
        }
