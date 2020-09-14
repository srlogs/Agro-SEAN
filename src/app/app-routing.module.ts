import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CanActivate } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { SellProductComponent } from './sell-product/sell-product.component';


const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "sell-product",
    component: SellProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
