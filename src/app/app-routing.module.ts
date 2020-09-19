import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CanActivate } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { SellProductComponent } from './sell-product/sell-product.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { BuyerPageComponent } from './buyer-page/buyer-page.component';


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
  },
  {
    path: "seller-page",
    component: SellerPageComponent
  },
  {
    path: "product-list",
    component: ProductListComponent
  },
  {
    path: "cart-view",
    component: CartViewComponent
  },
  {
    path: "buyer-page",
    component: BuyerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
