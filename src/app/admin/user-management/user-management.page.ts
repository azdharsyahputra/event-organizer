import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  standalone: false,
})
export class UserManagementPage implements OnInit {
  selectedEvent: string = 'all';
  participants: any[] = [];
  filteredParticipants: any[] = [];
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadParticipants();
    this.loadEvents();
  }

  loadParticipants() {
    this.eventService.getAllUsers().subscribe({
      next: (data) => {
        this.participants = data;
        this.filteredParticipants = [...data];
      },
      error: (err) => {
        console.error('❌ Gagal ambil data peserta:', err);
      }
    });
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('❌ Gagal ambil data event:', err);
      }
    });
  }

  filterPeserta(event: any) {
    const keyword = event.target.value?.toLowerCase() || '';
    this.filteredParticipants = this.participants.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.email.toLowerCase().includes(keyword)
    );
  }

  onEventChange(event: any) {
    if (this.selectedEvent === 'all') {
      this.filteredParticipants = [...this.participants];
    } else {
      this.filteredParticipants = this.participants.filter(p => p.event_id == this.selectedEvent);
    }
  }
}
