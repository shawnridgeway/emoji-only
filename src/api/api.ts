// 3p
import io from 'socket.io-client';

// Project 
import { User, Message, RawMessage } from '../types';
import { prepareMessage, prepareMessages } from '../utils/utils';


/* --- General --- */
const init = () => {
  // Init sockets
  window.socket = io();
}

/* --- Helpers --- */
const processJsonResponse = (res: Response) => {
  if (!res.ok) throw new Error();
  return res.json();
}

const makeJsonHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

const makeApiCall = <ResponseType = void>(url: string, options?: any): Promise<ResponseType> => {
  return fetch(url, options)
      .then(processJsonResponse) 
}

const makeWsListener = <ResponseType = void>(event: string): Promise<ResponseType> => {
  return new Promise<ResponseType>((resolve, reject) => {
    window.socket.on(event, (response: ResponseType) => {
      resolve(response)
    })
  })
}

const removeWsListener = (event: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    window.socket.off(event, () => {
      resolve()
    })
  })
}

/* --- Endpoint Types --- */
const get = <ResponseType = void>(url: string, options?: any) => {
  return makeApiCall<ResponseType>(url, {
    method: 'GET',
    ...options
  })
}

const post = <ResponseType = void>(url: string, body: any, options?: any) => {
  return makeApiCall<ResponseType>(url, {
    method: 'POST',
    headers: makeJsonHeaders(),
    body: JSON.stringify({ ...body }),
    ...options
  })
}

const subscribe = <ResponseType = void>(event: string) => {
  return makeWsListener<ResponseType>(event)
}

const unsubscribe = (event: string) => {
  return removeWsListener(event)
}

/* --- Endpoints --- */
const getUser = () => {
  return get<User>('/api/users')
}

const getMessages = () => {
  return get<RawMessage[]>('/api/messages')
      .then(prepareMessages)
};

const sendMessage = (message: string) => {
  return post<RawMessage>('/api/messages', { body: message })
      .then(prepareMessage)
}

const subscribeMessages = () => {
  return subscribe<RawMessage>('new-message')
      .then(prepareMessage)
}

const unsubscribeMessages = () => {
  return unsubscribe('new-message')
}

export default {
  init,
  getUser, 
  getMessages,
  sendMessage,
  subscribeMessages,
  unsubscribeMessages,
};