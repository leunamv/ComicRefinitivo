import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComicPage } from './add-comic.page';

const routes: Routes = [
  {
    path: '',
    component: AddComicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddComicPageRoutingModule {}
