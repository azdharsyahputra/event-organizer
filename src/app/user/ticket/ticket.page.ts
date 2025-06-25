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
  selectedFiles: { [key: number]: File } = {}; // Menyimpan file untuk setiap participant ID
  selectedTicketId: number | null = null;

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

  onFileSelected(event: any, participantId: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[participantId] = file;
    }
  }

  uploadBukti(participantId: number): void {
    const file = this.selectedFiles[participantId];
    if (!file) {
      alert('Silakan pilih file terlebih dahulu');
      return;
    }

    this.eventService.uploadBuktiPembayaran(participantId, file).subscribe({
      next: () => {
        alert('✅ Bukti pembayaran berhasil diupload');
        this.loadTickets(); // Refresh tiket setelah upload
      },
      error: (err) => {
        console.error('❌ Upload gagal:', err);
        alert('❌ Upload gagal. Silakan coba lagi.');
      }
    });
  }
// Untuk membuka input file secara manual
triggerUpload(ticketId: number) {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (input) input.click();
}

// Handle file upload
handleFileUpload(event: Event, ticketId: number | null) {
  if (ticketId === null) {
    console.warn('Ticket ID tidak valid.');
    return;
  }

  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    console.warn('File belum dipilih.');
    return;
  }

  this.eventService.uploadBuktiPembayaran(ticketId, file).subscribe({
    next: (res) => {
      console.log('✅ Bukti berhasil diupload:', res);
      this.loadTickets(); // refresh data
    },
    error: (err) => {
      console.error('❌ Upload gagal:', err);
    }
  });
}

openFileSelector(ticketId: number) {
  this.selectedTicketId = ticketId;
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  fileInput?.click();
}

}
