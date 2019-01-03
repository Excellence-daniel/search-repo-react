import React from "react";
import PropTypes from 'prop-types'

export default function DisplayTable (props) {

  return (
    <div>
    <center><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" style = {{display : props.showLoader, width: '10%', marginBottom: '-5%'}} /></center>
      <div className="col-md-12" style = {{marginTop :  '2%'}}>
      </div>
      <p className="col-md-12 normalize"> {props.searchval} </p>
      <div class = "col-md-1"> </div>
      <div class = "col-md-10">
      <p style = {{display : props.onStartOfAppText}}> <i> <center>  No data available. Search in Repo </center> </i> </p>
      <p style = {{display : props.NoresultsFoundText}}> <i> <center>  No results found </center> </i> </p>
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
      
      </div>
      <div class = "col-md-1"></div>
    </div>
  );
};
DisplayTable.propTypes = {
  perPageNum : PropTypes.number,
  currentPage : PropTypes.number,
  usersName : PropTypes.string,
  searchval : PropTypes.string,
  sortBy : PropTypes.func,
  repoList: PropTypes.array, 
}
