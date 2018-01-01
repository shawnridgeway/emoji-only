// 3p
import io from 'socket.io-client';
import { Observable, from, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Project 
import { User, Message, RawMessage } from '../types';
import { prepareMessage, prepareMessages } from '../utils/utils';


/* --- General --- */
const init = () => {
  // Init sockets
  window.socket = io();
}

/* --- Helpers --- */
const subjects: { [key: string]: Subject<any> } = {};

const processJsonResponse = (res: Response) => {
  if (!res.ok) throw new Error();
  return res.json();
}

const makeJsonHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

const makeWsObservable = <ResponseType = void>(event: string) => {
  return Observable.create((observer: Observer<ResponseType>) => {
    try {
      window.socket.on(event, (response: ResponseType) => {
        observer.next(response);
      })
    }
    catch (err) {
      observer.error(err)
    }

    return () => {
      window.socket.off(event);
    }
  });
}

const makeApiCall = <ResponseType = void>(url: string, options?: any): Promise<ResponseType> => {
  return fetch(url, options)
      .then(processJsonResponse) 
}

const makeWsListener = <ResponseType = void>(event: string): Promise<Observable<ResponseType>> => {
  return new Promise((resolve, reject) => {
    try {
      if (!subjects[event]) {
        const subject = new Subject<ResponseType>();
        const observable = makeWsObservable<ResponseType>(event);
        observable.subscribe(subject);
        subjects[event] = subject;
      }
      resolve(subjects[event].asObservable());
    }
    catch (err) {
      reject(err);
    }
  })
}

const removeWsListener = (event: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    subjects[event].complete();
    resolve();
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
      .then(rawMessages => rawMessages.pipe(
        map(prepareMessage)
      ))
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