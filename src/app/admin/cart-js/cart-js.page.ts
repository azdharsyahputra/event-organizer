import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-cart-js',
  templateUrl: './cart-js.page.html',
  styleUrls: ['./cart-js.page.scss'],
  standalone: false,
})
export class CartJsPage implements OnInit {

  statisticData: any;

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

ngOnInit(): void {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.get<any>('http://127.0.0.1:8000/api/participants/1/statistic', { headers })
    .subscribe({
      next: (response) => {
        if (response.success) {
          // Simpan langsung seluruh response, bukan response.data
          this.statisticData = response;
          this.renderChart();
        } else {
          console.warn('Data statistik tidak ditemukan:', response);
        }
      },
      error: (err) => {
        console.error('Gagal mengambil data statistik:', err);
      }
    });
}

renderChart() {
  if (!this.statisticData) return;

  setTimeout(() => {
    const ctx = document.getElementById('eventChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element tidak ditemukan.');
      return;
    }

    const data = this.statisticData;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Peserta'],
        datasets: [
          {
            label: 'Hadir',
            data: [data.hadir],
            backgroundColor: '#34A853'
          },
          {
            label: 'Tidak Hadir',
            data: [data.tidak_hadir],
            backgroundColor: '#EA4335'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, 0); // Delay kecil agar DOM siap
}
}
