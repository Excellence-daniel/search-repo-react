import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrashAlt } from 'react-icons/fa';
import './bootstrap.css'

export class ProfileCreator extends React.Component{
constructor(props){
	super(props);
	this.state = {
		idCount: 0,
	users: [],
	name : "",
	email :"",
	nameInput : "",
	emailInput : "",
	btnSub : true,
	delBtn : true
	}
	this.nameChange = this.nameChange.bind(this)
	this.emailChange = this.emailChange.bind(this)
	this.displayUser = this.displayUser.bind(this)
	this.dataClick = this.dataClick.bind(this)
	this.deleteAll = this.deleteAll.bind(this)
}

nameChange(e){
var nameVal = e.target.value
this.setState({nameInput: nameVal})
if(nameVal == ""){
	this.setState({btnSub: true})
} else {
this.setState({name: nameVal, btnSub : false})
}
}
emailChange(e){
	var emailVal = e.target.value;
	this.setState({emailInput: emailVal})
	if(emailVal == ""){
		this.setState({btnSub: true})
	} else {
	this.setState({email: emailVal, btnSub : false})
	}
	if ((emailVal.indexOf("@") < 1) || (emailVal.indexOf(".") < 1) || (emailVal.indexOf(".") < emailVal.indexOf("@") )){
		console.log("Not an email")
		this.setState({btnSub: true})
} else {
			this.setState({btnSub: false})
			console.log("Email!!!")
		}
	}

displayUser(){
var id = this.state.idCount
id = id + 1
//var usersContent = this.state.users
var newName =  this.state.name
var newEmail = this.state.email
if (newName === "" || newEmail === ""){

	alert("Enter Values into name and email boxes ")
}else{
var user = {name: newName, email : newEmail}
//usersContent = usersContent.push(user)
this.setState({users: [...this.state.users, user], delBtn : false})
console.log(this.state.users)

}
this.setState({nameInput: "", emailInput : ""})
}
dataClick(e){
	var ID =  e.target.id
	const objs = this.state.users
	objs.splice(ID,1)
	//console.log(objs)
	this.setState({users : objs})
	//alert(ID)
}
deleteAll(){
var allUsers =  this.state.users
	if (allUsers.length < 1 ){
		alert("There are no users to delete!")
	} else {
this.setState({users : []})

}
}
	render(){
	return <div style = {{marginTop: '2%'}}>
	<div className = "col-md-12 normalize">
	<center>	<p className = "col-md-6 normalize"> <input onChange = {this.nameChange} value = {this.state.nameInput} style = {{width: '80%'}} className ="form-control" placeholder="Full Name"/> </p>
		<p className = "col-md-6 normalize"> <input onChange = {this.emailChange} value = {this.state.emailInput} style = {{width: '80%'}} className = "form-control" placeholder = "Email"/> </p>
	</center>
		<center>
			<button className = "btn btn-default btn-block" disabled ={this.state.btnSub} style = {{width: '92%'}} onClick = {this.displayUser} > SUBMIT </button>
			<button className = "btn btn-alert btn-block" disabled = {this.state.delBtn} style = {{width: '92%', marginTop: '1%', color: 'white', background: 'red'}} onClick = {this.deleteAll} > DELETE ALL </button>
		</center>
	</div>

<div className = "col-md-12 normalize" style ={{marginTop : '2%'}}>
<div className ="col-md-2 normalize"> </div>
<div className = "col-md-8 normalize">
{this.state.users.map((eachuser, index) => (
	<div className = "col-md-12 normalize" style = {{marginTop: '2%'}}key= {index}>
 			<div className = "col-md-9 normalize">
 						<div> {eachuser.name} </div>
 						<div> {eachuser.email}  </div>
 			</div>
 			<div className = "col-md-3 normalize">
 						<FaTrashAlt onClick ={this.dataClick} id = {index} style ={{float: 'right', marginTop: '5%', cursor: 'pointer'}}/>
 			</div>
 	</div>
	))}
	</div>
	<div className = "col-md-2 normalize"></div>
	</div>


	</div>
	}

}
