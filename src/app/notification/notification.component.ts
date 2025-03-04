import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';

import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {


  redNotification: string = "";

  numNotifications: string = "";

  listReclamations: Reclamation[] = [];

  idUser: string = "";

  notifications: number = 0;

  private intervalId: any;
 
  constructor(  
    private reclamationService: ReclamationService,
    private router: Router,
    private eRef: ElementRef
  ) {}
  
  showNotifications: boolean = false; 

  ngOnInit(): void {
    const token = localStorage.getItem('tokenClient');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.idUser = decoded.id;

        
      }catch (error) {
        console.error('Error decoding token:', error);
      }
      console.log("id useer", this.idUser);
    }

    this.loadNotifications();

    // Set interval to reload notifications every 15 seconds
    this.intervalId = setInterval(() => {
      this.loadNotifications();
    }, 15000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadNotifications(): void {
    this.reclamationService.getReclamationById(this.idUser).subscribe(
      
      (data: Reclamation[]) => {
        this.listReclamations = data.filter(reclamation => reclamation.notification !== "0");
        this.notifications = this.listReclamations.length;
        this.numNotifications = this.notifications.toString();
        this.redNotification = this.notifications > 0 ? "icon-button__badge" : "";

        if (this.numNotifications === "0") {
          this.numNotifications = "";
        }
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
    );
  }

navigateToReclamation(id: string): void {
  this.router.navigate(['/edit', id]).then(() => {
    window.location.reload();
    let obj = { notification: "0"} 

    this.reclamationService.updateReclamationPatch(id, obj).subscribe((data) =>{
  }); 

  });
}

toggleNotifications(): void {
  this.showNotifications = !this.showNotifications;
}

@HostListener('document:click', ['$event'])
clickout(event: Event): void {
  if (this.showNotifications && !this.eRef.nativeElement.contains(event.target)) {
    this.showNotifications = false;
  }
}

}
