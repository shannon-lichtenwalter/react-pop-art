import config from '../config';
import TokenService from './token-service';


const RequestorsApiService = {

  addNewRequest(event_id){
    return fetch(`${config.API_ENDPOINT}/requests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization' : `bearer ${TokenService.getAuthToken()}`
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