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
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormReclamationComponent } from './form-reclamation/form-reclamation.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { ModalComponent } from './modal/modal.component';
import { NotificationComponent } from './notification/notification.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { RouterModule } from '@angular/router';

// import { CategorieClientService, ClientService } from 'src/app/core/services';
import { LoginFormComponent } from './UserAPI/login-form/login-form.component';
import { SignupComponent } from './UserAPI/signup/signup.component';
import { FootbarComponent } from './footbar/footbar.component';
import { NewslettreComponent } from './newslettre/newslettre.component';
import { ChatComponent } from './services/chat/chat.component';
import { VerifyEmailComponent } from './UserAPI/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './UserAPI/forget-password/forget-password.component';
import { ResetPasswordComponent } from './UserAPI/reset-password/reset-password.component';
import { ProfilComponent } from './UserAPI/profil/profil.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountComponent } from './account/account.component';

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
    PanierComponent,
    TransactionComponent,
    FormReclamationComponent,
    ListReclamationComponent,
    ModalComponent,
    NotificationComponent,
    ClientFormComponent,
    ProfilComponent,
    LoginFormComponent,
    SignupComponent,
    FootbarComponent,
    NewslettreComponent,
    ChatComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
