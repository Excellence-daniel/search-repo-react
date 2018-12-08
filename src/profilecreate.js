import React from 'react'
import ReactDOM from 'react-dom'

export class ProfileCreator extends React.Component{
constructor(props){
	super(props);
	this.state = {
		idCount: 0,
	users: [],
	name : "",
	email :""
	}
	this.nameChange = this.nameChange.bind(this)
	this.emailChange = this.emailChange.bind(this)
	this.displayUser = this.displayUser.bind(this)
	this.dataClick = this.dataClick.bind(this)
}

nameChange(e){
var nameVal = e.target.value
this.setState({name: nameVal})
}
emailChange(e){
	var emailVal = e.target.value;
	this.setState({email: emailVal})
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
this.setState({users: [...this.state.users, user]})
console.log(this.state.users)
}
}
dataClick(){
alert()
}
	render(){
	return <div style = {{marginTop: '10%'}}>
		<input onChange = {this.nameChange} placeholder="Full Name"/>
		<input onChange = {this.emailChange} placeholder = "Email"/>
		<button onClick = {this.displayUser} > SUBMIT </button>

<div> {this.state.users.map(eachuser => (
<div style = {{background: 'red'}} key= {eachuser.name} className = "col-md-3 normalize">
 <p> {eachuser.name} </p>
 <p> {eachuser.email}  </p>
 <button onClick ={this.dataClick} style ={{float: 'right'}}> Delete </button>
 </div>
	))}
	</div>

	</div>
	}

}
