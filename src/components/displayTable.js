import React from "react";
import PropTypes from 'prop-types'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function DisplayTable (props) {
  /*propTypes: {
    perPageNum : PropTypes.number,
    btnDisplay : PropTypes.string,
    usersName : PropTypes.string,
    searchval : PropTypes.string,
    sortBy : PropTypes.func,
    backBtn : PropTypes.func,
    nextBtn : PropTypes.func,
    repoList: PropTypes.array
  } */

  var pages =  props.pagesNum
  const displayBtn  = { display : props.btnDisplay, float : 'right' }
  const styleBtn = {borderRadius: '50%', background: '#bbc5ce', borderColor: '#bbc5ce'}
  return (
    <div>
    <center><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" style = {{display : props.showLoader, width: '10%', marginBottom: '-5%'}} /></center>
      <div className="col-md-12" style = {{marginTop :  '2%'}}>
      </div>
      <p className="col-md-12 normalize"> {props.searchval} </p>
      <div class = "col-md-2"> </div>
      <div class = "col-md-8">
      <p style = {{display : props.textDisplay}}> <i> <center>  No results found </center> </i> </p>
      <table className="table table-bordered" style={{ marginTop: "1%", display: props.btnDisplay }}>
        <thead className="thead-dark">
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => props.sortBy("id")}
            >
              ID
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => props.sortBy("name")}
            >
              Repo Title
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => props.sortBy("owner.login")}
            >
              Owner
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => props.sortBy("stargazers_count")}
            >
              Stars
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => props.sortBy("created_at")}
            >
              Created at
            </th>
          </tr>
        </thead>
        <tbody className="tbody-light">
          {props.repoList.map(eachitem => (
            <tr key={eachitem.id} style={{background: eachitem.owner.login === props.usersName.trim() ? '#337ab773' :'none'}}>
              <td>{eachitem.id} </td>
              <td>{eachitem.name} </td>
              <td>{eachitem.owner.login} </td>
              <td> {eachitem.stargazers_count} </td>
              <td> {eachitem.created_at.slice(0, 10)} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style = {displayBtn}>
        <button className = "btn btn-primary" disabled = {props.backBtnDisable} style = {styleBtn} onClick={props.backBtn}><center><FaChevronLeft style = {{fontSize: '10px'}}/></center></button> &nbsp;
                {props.currentPage} of {pages}
        &nbsp; <button className = "btn btn-primary" disabled ={props.nextBtnDisable} style = {styleBtn} onClick={props.nextBtn}><center><FaChevronRight style = {{fontSize: '10px'}}/></center></button>
      </p>
      </div>
      <div class = "col-md-2"></div>
    </div>
  );
};
DisplayTable.propTypes = {
  perPageNum : PropTypes.number,
  btnDisplay : PropTypes.string,
  usersName : PropTypes.string,
  searchval : PropTypes.string,
  sortBy : PropTypes.func,
  backBtn : PropTypes.func,
  nextBtn : PropTypes.func,
  repoList: PropTypes.array
}
