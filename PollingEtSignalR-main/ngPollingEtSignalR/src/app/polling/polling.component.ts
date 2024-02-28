import { Component, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "pablo?";

  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)

    let result = await lastValueFrom(this.http.get<any>("https://localhost:7289/api/UselessTasks/Complete/" + id))

    return console.log(result)
  }

  async addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    let task = {
      "taskText": this.taskname,
    }

    let result = await lastValueFrom(this.http.post<any>("https://localhost:7289/api/UselessTasks/Add?taskText=" + this.taskname, null))
    return console.log(result)
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    console.log("======= Je polle ======");
    let result = await lastValueFrom(this.http.get<any>("https://localhost:7289/api/UselessTasks/GetAll"));
    // On peut décidé de continer de poller dans certains cas
      this.tasks = result

    console.log(result)
      //On recommence dans 0.5 seconde en rappelant la même méthode
      setTimeout(() => {this.updateTasks()}, 1000);

  }
}
