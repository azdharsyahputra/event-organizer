import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  standalone: false,
})
export class EventDetailPage implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('Dapatkan ID:', id); // 🔍 Debug ID
  if (id) {
    this.eventService.getEventById(+id).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (err) => {
        console.error('Gagal ambil data event:', err);
      }
    });
  }
}


  getImageUrl(filename: string): string {
    return `http://127.0.0.1:8000/storage/event/${filename}`;
  }
}
