import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  /**
   * Ambil semua event
   */
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  /**
   * Ambil detail event berdasarkan ID
   * @param id ID event
   */
getEventById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/events/${id}`, {
    withCredentials: true // Tambahkan ini jika belum
  });
}

getRole(): string {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.role || '';
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
getMyTickets(): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  return this.http.get<any>('http://127.0.0.1:8000/api/event/my-events', { headers });
}

 getMyAttendedEvents(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/event/history-events`, { headers });
  }


registerToEvent(eventId: number) {
  const token = localStorage.getItem('token');
  return this.http.post(
    `${this.apiUrl}/event/${eventId}/register`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
createEvent(data: any) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${this.apiUrl}/events`, data, { headers });
}
getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/events`);
}
getAllEvents(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/events`);
}
updateAttendance(eventId: number, userId: number) {
  const token = localStorage.getItem('token');
  return this.http.put(
    `${this.apiUrl}/event/${eventId}/register/${userId}`,
    { status_kehadiran: 'hadir' },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
getEventStatistik(eventId: number) {
  return this.http.get<any>(`${this.apiUrl}/events/${eventId}/statistic`);
}

}
