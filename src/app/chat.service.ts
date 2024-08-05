import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  
  constructor(){
   this.socket = io('http://localhost:3000', {
    withCredentials: true,
    extraHeaders:{
      "my-custom-header": "abcd"
    }
   });

   this.socket.on("connect", ()=>{
    console.log("connected to server")
    console.log(this.socket.id);
   })
   
   this.socket.on('connect_error', (error)=>{
     console.log('Connection error:', error);
    })
    
   this.socket.on("disconnect", (reason)=>{
    console.log("Disconnected from server", reason);
   })

  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable((observer) => {

      const messageHandler = (message: any) => {
        observer.next(message);
      }

      this.socket.on('message',messageHandler);

      return () => {
        this.socket.off('message', messageHandler);
      };
    });
  }
}
