import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProduitDetailsComponent } from './produit-details/produit-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';
import { BreadcrumpComponent } from './breadcrump/breadcrump.component';

@NgModule({
  declarations: [
    AppComponent,
    ECommerceComponent,
    ProductsComponent,
    NavbarComponent,
    NotfoundComponent,
    ProduitDetailsComponent,
    AddProductComponent,
    AddCategorieComponent,
    ListProductsComponent,
    ManagementCategoriesComponent,
    CategorieDetailsComponent,
    BreadcrumpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
