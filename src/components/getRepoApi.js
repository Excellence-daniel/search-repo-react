import axios from 'axios'
import {AsyncStorage} from "AsyncStorage"

export const apiGetter = async (inputVal) => {
  console.log(inputVal)
  const resp = await axios
    .get(`https://api.github.com/search/repositories?q=${inputVal}`)

    return resp;
}
