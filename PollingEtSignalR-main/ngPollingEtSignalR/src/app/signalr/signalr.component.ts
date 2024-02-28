import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { UselessTask } from '../models/UselessTask';


@Component({
  selector: 'app-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.css']
})
export class SignalrComponent implements OnInit {

  private hubConnection?: signalR.HubConnection;
  usercount = 0;
  tasks: UselessTask[] = [];
  taskname: string = "";

  ngOnInit(): void {
    this.connecttohub()
  }

  connecttohub() {
    // On doit commencer par créer la connexion vers le Hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7289/testHub')
      .build();
    // On se connecte au Hub
    this.hubConnection
      .start()
      .then(() => {
        console.log('La connexion est active!');
        // TODO Une fois connectée, on peut commencer à écouter pour les évènements qui vont déclencher des callbacks
        this.hubConnection!.on('TaskList', (data) => {
          // data a le même type que ce qui a été envoyé par le serveur
          this.tasks = data;
          console.log(data);
        })

        this.hubConnection!.on('UserCount', (data) => {
          this.usercount = data
          console.log(data);
        })
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur
    this.hubConnection!.invoke('CompleteTask', id);
  }

  addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur
    this.hubConnection!.invoke('AddTask', this.taskname);
  }

}
