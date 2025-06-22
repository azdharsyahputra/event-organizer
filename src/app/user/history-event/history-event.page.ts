import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';


@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.page.html',
  styleUrls: ['./history-event.page.scss'],
  standalone: false,
})
export class HistoryEventPage implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getMyAttendedEvents().subscribe({
      next: (res) => {
        this.events = res.data;
      },
      error: (err) => {
        console.error('❌ Gagal load event hadir:', err);
      }
    });
  }
lihatSertifikat(registrationId: number): void {
  const url = `http://127.0.0.1:8000/api/generate-sertifikat/${registrationId}`;
  window.open(url, '_blank'); // buka tab baru
}
}
