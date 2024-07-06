import { ChatService } from '../chat.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  public roomId!:          string;
  public messageText!:     string;
  public messageArray: {user: string, message: string} [] = [];

  public phone!: string;
  public currentUser: any;
  public selectedUser: any;

  private storageArray = [];

  public showScreen = false;

constructor(
  private chatService: ChatService
){

  
}

ngOnInit(): void{
  // this.chatService.getMessage()
  // .subscribe((data: { user: string, room: string, message: string }) => {
  //   // this.messageArray.push(data);
  //   if (this.roomId) {
  //     setTimeout(() => {
  //       this.storageArray = this.chatService.getStorage();
  //       const storeIndex = this.storageArray;
  //         //.findIndex((storage) => storage.roomId === this.roomId);
  //       //this.messageArray = this.storageArray[storeIndex].chats;
  //     }, 500);
  //   }
  // });
}


}
