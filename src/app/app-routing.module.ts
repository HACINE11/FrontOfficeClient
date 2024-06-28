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
import { PanierComponent } from './panier/panier.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { FormReclamationComponent } from './form-reclamation/form-reclamation.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', component: ECommerceComponent },
      { path: ':id', component: ProductsComponent },
      {
        path: ':idCategorie/:idProduit',
        component: ProduitDetailsComponent,
      },
    ],
  },

  { path: 'add-categorie', component: AddCategorieComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'transaction', component: TransactionComponent },
  
  {path:'listRec',
    component: ListReclamationComponent,
    },
   {path:'newRec',
    component: FormReclamationComponent,
   },
   {path:'edit/:id',
    component: FormReclamationComponent,
    },
  {
    path: 'management-categorie',
    children: [
      { path: '', component: ManagementCategoriesComponent },
      { path: 'update/:idCategorie', component: AddCategorieComponent },
      { path: ':id', component: ListProductsComponent },
      { path: ':idCategorie/:idProduit', component: AddProductComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
