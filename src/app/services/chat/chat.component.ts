import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

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

constructor(
  private chatService: ChatService
){

}

ngOnInit(): void{

}


}
