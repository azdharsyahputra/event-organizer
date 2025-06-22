import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  standalone: false,
})
export class TicketPage implements OnInit {
 tickets: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    console.log('📦 Mulai ambil tiket...');
    this.eventService.getMyTickets().subscribe({
      next: (res: any) => {
        console.log('✅ Respon dari API:', res);
        this.tickets = res.data;
      },
      error: (err: any) => {
        console.error('❌ Gagal ambil tiket:', err);
      }
    });
  }
}
