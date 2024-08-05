import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  text: string;
  timestamp: Date;
  isSent: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push({
        text: message,
        timestamp: new Date(),
        isSent: false
      });
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.messages.push({
        text: this.message,
        timestamp: new Date(),
        isSent: true
      });
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
