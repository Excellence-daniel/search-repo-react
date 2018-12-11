import axios from 'axios'
import {AsyncStorage} from "AsyncStorage"

        export const apiGetter = async (inputVal) => {
          //inputVal is passed as a parameter from 'search.js'
          //console.log("Input",inputVal)
          const resp = await axios
            .get(`https://api.github.com/search/repositories?q=${inputVal}`)
              //store the data from the get method into 'resp' and return 'resp'
            return resp;
        }
