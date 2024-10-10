import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Aplikasi Cuaca</ion-title>
          <ion-buttons slot="end">
            <ion-text class="creator-info">
              Madeleine Mamengko_220211060094
            </ion-text>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Cek Cuaca</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Masukkan nama kota</ion-label>
              <ion-input
                [(ngModel)]="city"
                (keyup.enter)="getWeather()"
              ></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              (click)="getWeather()"
              class="ion-margin-top"
              >Cari Cuaca</ion-button
            >

            <ion-card *ngIf="weather" class="ion-margin-top">
              <ion-card-header>
                <ion-card-subtitle>Hasil Pencarian</ion-card-subtitle>
                <ion-card-title>{{ weather.name }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-icon
                      name="thermometer-outline"
                      slot="start"
                    ></ion-icon>
                    <ion-label>Suhu: {{ weather.main.temp }}°C</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon name="water-outline" slot="start"></ion-icon>
                    <ion-label
                      >Kelembaban: {{ weather.main.humidity }}%</ion-label
                    >
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      name="speedometer-outline"
                      slot="start"
                    ></ion-icon>
                    <ion-label
                      >Kecepatan Angin: {{ weather.wind.speed }} m/s</ion-label
                    >
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      name="partly-sunny-outline"
                      slot="start"
                    ></ion-icon>
                    <ion-label
                      >Deskripsi:
                      {{ weather.weather[0].description }}</ion-label
                    >
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-app>
  `,
  styles: [
    `
      ion-content {
        --background: #f4f5f8;
      }
      ion-card {
        margin: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }
      .creator-info {
        font-size: 12px;
        padding-right: 10px;
        color: #ffffff;
      }
    `,
  ],
})
export class AppComponent {
  city: string = '';
  weather: any;
  apiKey: string = '00826c066a05c3d7efecee421d6d6789';

  constructor(private http: HttpClient) {}

  getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe(
      (response) => {
        this.weather = response;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}
