import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';
import {
  setPaginatedResponse,
  setPaginationHeaders,
} from '../_helpers/paginationHelpers';
import { PaginatedResult } from '../_models/pagination';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { User } from '../_models/user';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubsUrl;
  hubConnection?: HubConnection;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);
  messageThread = signal<Message[]>([]);
  // SendMessage can only be invoked while the hub is connected
  hubConnected = signal(false);

  createHubConnection(user: User, otherUsername: string) {
    const connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection = connection;
    this.hubConnected.set(false);

    // An older connection that is still closing must not overwrite the state of the current one
    const setConnected = (connected: boolean) => {
      if (this.hubConnection === connection) this.hubConnected.set(connected);
    };
    connection.onclose(() => setConnected(false));
    connection.onreconnecting(() => setConnected(false));
    connection.onreconnected(() => setConnected(true));

    connection
      .start()
      .then(() => setConnected(true))
      .catch((error) => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThread.set(messages);
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread.update((messages) => [...messages, message]);
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread.update((messages) => {
          messages.forEach((message) => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          return messages;
        });
      }
    });
  }

  stopHubConnection() {
    if(this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error))
    }
  }

  // getMessages(pageNumber: number, pageSize: number, container: string) {
  //   let params = setPaginationHeaders(pageNumber, pageSize);

  //   params = params.append('Container', container);

  //   return this.http
  //     .get<Message[]>(this.baseUrl + 'messages', {
  //       observe: 'response',
  //       params,
  //     })
  //     .subscribe({
  //       next: (response) =>
  //         setPaginatedResponse(response, this.paginatedResult),
  //     });
  // }

  getMessages(container: string) {
    const params = { Container: container }; // Передаємо лише контейнер як параметр
  
    return this.http.get<Message[]>(this.baseUrl + 'messages', { params }).subscribe({
      next: (messages) => {
        // Зберігаємо отримані повідомлення
        this.messageThread.set(messages);
      },
      error: (err) => console.error('Failed to fetch messages', err),
    });
  }
  

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessage', { recipientUsername: username, content })
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}