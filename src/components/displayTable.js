import React from "react";
import PropTypes from 'prop-types'

export default props => {
  /*propTypes: {
    perPageNum : PropTypes.number,
    btnDisplay : PropTypes.string,
    searchval : PropTypes.string,
    sortBy : PropTypes.func,
    backBtn : PropTypes.func,
    nextBtn : PropTypes.func,
    repoList: PropTypes.array
  } */
  const style = {display : props.btnDisplay}
  return (
    <div>
      <div className="col-md-12" style = {{marginTop: '6%'}}>
      </div>
      <p className="col-md-12 normalize"> {props.searchval} </p>
      <table className="table table-hover" style={{ marginTop: "1%" }}>
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
            <tr key={eachitem.id} style={{background: eachitem.owner.login === 'toystars'? 'green' :'none'}}>
              <td>{eachitem.id} </td>
              <td>{eachitem.name} </td>
              <td>{eachitem.owner.login} </td>
              <td> {eachitem.stargazers_count} </td>
              <td> {eachitem.created_at.slice(0, 10)} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <center>
        <button className = "btn btn-primary" style = {style} onClick={props.backBtn}> Back </button> &nbsp; &nbsp;
        <button className = "btn btn-primary" style = {{display: props.btnDisplay}} onClick={props.nextBtn}> Next </button>
      </center>
    </div>
  );
};
