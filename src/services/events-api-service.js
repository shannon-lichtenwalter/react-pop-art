import config from '../config';
import TokenService from './token-service';

const EventsApiService = {

  getEvents(city, event_type, date) {
    let filter = { city, event_type, date };
    let queryString = '';
    let strings = []

    for (const key in filter){
      if(filter[key]){
        strings.push(`${key}=${filter[key]}`)
      }
    }
    queryString = strings.join('&')

    return fetch(`${config.API_ENDPOINT}/events/?${queryString}`, {
      method: 'GET',
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getAllEventsHostedByUser() {
    return fetch(`${config.API_ENDPOINT}/events/user-events`, {
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

  postEvent(newEvent) {
    return fetch(`${config.API_ENDPOINT}/events/user-events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(
        newEvent
      )
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  archiveEvents() {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'PATCH'
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return null
      })
  },

  updateSlotsAvailable(event_id) {
    return fetch(`${config.API_ENDPOINT}/events/user-events`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id: event_id,
        slots_available: 'decrease'
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },


  deleteEvent(event_id) {
    return fetch(`${config.API_ENDPOINT}/events/user-events`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id: event_id
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : null
      )
  }

}

export default EventsApiService;