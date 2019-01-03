import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function Pagination (props) {  

	const displayBtn  = { display : props.btnDisplay, float: 'right' }
  	const styleBtn = {borderRadius: '50%', background: '#bbc5ce', borderColor: '#bbc5ce'}
	var pages =  props.pagesNum

return (
	<div class = "col-md-10"> 
	  <p style = {displayBtn}>
       <button className = "btn btn-primary" disabled = {props.backBtnDisable} style = {styleBtn} onClick={props.backBtn}><center><FaChevronLeft style = {{fontSize: '10px'}}/></center></button>
        &nbsp;
                {props.currentPage} of {pages}
        &nbsp; 
    <button className = "btn btn-primary" disabled ={props.nextBtnDisable} style = {styleBtn} onClick={props.nextBtn}><center><FaChevronRight style = {{fontSize: '10px'}}/></center></button>
      </p>
    </div>
	)

  }

  Pagination.propTypes = {
  pagesNum : PropTypes.number,  
  backBtn : PropTypes.func,
  nextBtn : PropTypes.func,
  btnDisplay : PropTypes.string,
  backBtnDisable: PropTypes.bool, 
  nextBtnDisable : PropTypes.bool
  }

