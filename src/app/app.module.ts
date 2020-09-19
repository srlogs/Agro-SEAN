import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { FilterPipe } from './filter.pipe';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { BuyerPageComponent } from './buyer-page/buyer-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NotifictionPageComponent } from './notifiction-page/notifiction-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    SellProductComponent,
    FilterPipe,
    SellerPageComponent,
    ProductListComponent,
    CartViewComponent,
    BuyerPageComponent,
    OrderListComponent,
    NotifictionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
