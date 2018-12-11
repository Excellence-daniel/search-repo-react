import React from 'react'
import axios from "axios";

export class LoginBtn extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			userInfo : []
		}
	}
  async componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    console.log(code);
    
    const accessInfo = {
       code: code, //JSON.stringify{${code}}
       client_id: "e3fc4b772f51672f9b31", 
       client_secret: "3ec04f59220a2a93dc5b3bd46d75953e7f5e46ee",
       redirect_uri: "https://localhost:3000/github/callback?",
       //mode: "no-cors"
    }

    if (code) {

/*fetch(`https://github.com/login/oauth/access_token`, {
  method: 'POST',
   headers: {
   'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }, 
   body: JSON.stringify(accessInfo) // <-- Post parameters
})
.then(res => res.json())
.then(data => console.log(data))
.catch(e=>{
  console.log(e)
}) */



// .then((response) => console.log(response))
// console.log(`data`, response.data)
// .then((data) => {
//   console.log("Token: ",(data));
// })
// .catch((error) => {
//     console.error(error);
// });



  

fetch(`https://crossorigin.me/https://github.com/login/oauth/access_token?callback=client_id=${accessInfo.client_id}&client_secret=${accessInfo.client_secret}&code=${code}`, {
  method: 'POST',
  //mode: 'no-cors',
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  credentials: "same-origin",
  //body: `client_id=${accessInfo.client_id}&client_secret=${accessInfo.client_secret}&code=${code}` // <-- Post parameters
})
.then((response) => console.log("hey", response))
.then((data) => {
  console.log("Token: ",(data));
})
.catch((error) => {
    console.error("Err",error);
});

      /*fetch('https://github.com/login/oauth/access_token?', {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true 
                },
                body: JSON.stringify({
                code: code, //JSON.stringify{${code}}
                client_id: "e3fc4b772f51672f9b31", 
                client_secret: "3ec04f59220a2a93dc5b3bd46d75953e7f5e46ee",
                redirect_uri: "https://github.com/login/oauth/access_token"
                })
              })
            .then((res) => console.log("RES: " ,res))
            .then((data) =>  console.log("DATA: " + JSON.stringify(data)))
            .catch((err)=> console.log("err:" + err))*/
      


}
}


  //e6f67590d41f3bdada78 -- access token gotten
	render(){
		var CLIENT_ID = "e3fc4b772f51672f9b31"
		var REDIRECT_URI = "http://localhost:3000/"
    var STATE = "fbdfuvue839984jd"
	return <div>
<a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          ><center>
            Login</center>
          </a>
	 </div>
	}
}