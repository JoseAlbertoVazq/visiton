import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { RouteDto } from '../dto/route.dto';
import { OneRouteResponse } from '../interfaces/one-route-response';
import { environment } from './../../environments/environment.prod';
import { RouteResponse } from './../interfaces/route-response';

const routeUrl = `${environment.apiUrl}/routes`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  token = `?access_token=${this.authService.getToken()}`;
  public selectedRoute: OneRouteResponse;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAll(): Observable<RouteResponse> {
    return this.http.get<RouteResponse>(`${routeUrl}${this.token}`);
  }

  getOne(id: string): Observable<OneRouteResponse> {
    return this.http.get<OneRouteResponse>(`${routeUrl}/${id}${this.token}`);
  }

  create(resource: RouteDto): Observable<OneRouteResponse> {
    return this.http.post<OneRouteResponse>(`${routeUrl}${this.token}`, resource);
  }

  remove(id: string): Observable<RouteResponse[]> {
    return this.http.delete<RouteResponse[]>(`${routeUrl}/${id}${this.token}`);
  }

  edit(id: string, resource: RouteDto): Observable<OneRouteResponse> {
    return this.http.put<OneRouteResponse>(`${routeUrl}/${id}${this.token}`, resource);
  }
}
