import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  { path: 'product-management', component: ProductManagementComponent },
  { path: '', redirectTo: '/product-management', pathMatch: 'full' },  // Redirect root path to HomeComponent
  { path: '**', redirectTo: '' }  // Wildcard route for 404, redirect to HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
