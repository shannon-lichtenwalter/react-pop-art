import config from '../config';
import TokenService from './token-service';

const EventsApiService = {

getEvents(){
  return fetch(`${config.API_ENDPOINT}/events`, {
    method: 'GET',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    },
  })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
},

postEvent(newEvent){
  return fetch(`${config.API_ENDPOINT}/events`, {
    method: 'POST',
    headers: {
      'authorization' : `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify({
      newEvent
    })
  })
  .then(res => 
    (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
  )
}
}

export default EventsApiService;