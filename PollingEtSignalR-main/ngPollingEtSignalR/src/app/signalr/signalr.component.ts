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
    // TODO On doit commencer par créer la connexion vers le Hub

    // TODO On doit ensuite se connecter
    // TODO Une fois connectée, on peut commencer à écouter pour les évènements qui vont déclencher des callbacks
  }

  complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur
  }

  addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur
  }

}
