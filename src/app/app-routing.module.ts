import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProduitDetailsComponent } from './produit-details/produit-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', component: ECommerceComponent },
      { path: ':id', component: ProductsComponent },
      {
        path: ':id/details/:idProduit',
        component: ProduitDetailsComponent,
      },
    ],
  },
  {
    path: 'add-product',
    children: [
      { path: '', component: AddProductComponent },
      { path: ':id', component: AddProductComponent },
    ],
  },
  { path: 'add-categorie', component: AddCategorieComponent },
  { path: 'list-products', component: ListProductsComponent },
  {
    path: 'management-categorie',
    children: [
      { path: '', component: ManagementCategoriesComponent },
      { path: ':id', component: ListProductsComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
