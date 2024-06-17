import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.css'],
})
export class BreadcrumpComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.router.url);
      });
  }

  createBreadcrumbs(url: string): Breadcrumb[] {
    const segments = url.split('/').filter((segment) => segment);
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Accueil',
        url: '/',
      },
    ]; // Ajout de l'accueil au début

    let accumulatedUrl = '';

    segments.forEach((segment, index) => {
      accumulatedUrl += `/${segment}`;
      breadcrumbs.push({
        label: this.formatLabel(segment),
        url: accumulatedUrl,
      });
    });

    return breadcrumbs;
  }

  formatLabel(label: string): string {
    // Format the label as needed, e.g., capitalize first letter
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
}
