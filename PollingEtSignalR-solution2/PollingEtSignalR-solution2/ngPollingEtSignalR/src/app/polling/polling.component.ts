import { Component, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  apiUrl = "https://localhost:7289/api/";
  tasks: UselessTask[] = [];
  taskname: string = "";

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.updateTasks();
  }

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    return await lastValueFrom(this.http.get<any>(this.apiUrl+'UselessTasks/Complete/' + id));
  }

  async addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    this.tasks.push(await lastValueFrom(this.http.post<UselessTask>(this.apiUrl+'UselessTasks/Add?taskText=' + this.taskname, null)));
  }

  async updateTasks() {
    // TODO Utiliser le polling pour non seulement mettre la liste de tasks à jour, mais continuer de le faire chaque seconde
    this.tasks = await lastValueFrom(this.http.get<UselessTask[]>(this.apiUrl+'UselessTasks/GetAll'));

    setTimeout(() => this.updateTasks(), 1000);
  }
}
