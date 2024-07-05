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
import { ClientFormComponent } from './client-form/client-form.component';

import { LoginFormComponent } from './UserAPI/login-form/login-form.component';
import { SignupComponent } from './UserAPI/signup/signup.component';
import { VerifyEmailComponent } from './UserAPI/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './UserAPI/forget-password/forget-password.component';
import { ResetPasswordComponent } from './UserAPI/reset-password/reset-password.component';
import { ProfilComponent } from './UserAPI/profil/profil.component';
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

  { path: 'login-form',  component: LoginFormComponent },
  { path: 'forget-password',  component: ForgetPasswordComponent },
  { path: 'reset-password',  component: ResetPasswordComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'verify-email',  component: VerifyEmailComponent },
  { path: 'profil',  component: ProfilComponent },

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
  { path: 'Devenir client', component: ClientFormComponent },

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
