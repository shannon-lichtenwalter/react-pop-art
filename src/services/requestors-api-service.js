import config from '../config';
import TokenService from './token-service';


const RequestorsApiService = {
  //this function will get the logged in user's requests
  getAllRequests() {
    return fetch(`${config.API_ENDPOINT}/requests`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

addNewRequest(event_id){
  return fetch(`${config.API_ENDPOINT}/requests`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify({
      event_id
    })
  })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
},
  
  }

export default RequestorsApiService;