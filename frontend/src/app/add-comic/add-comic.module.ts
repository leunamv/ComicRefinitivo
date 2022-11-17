import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddComicPageRoutingModule } from './add-comic-routing.module';

import { AddComicPage } from './add-comic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddComicPageRoutingModule
  ],
  declarations: [AddComicPage]
})
export class AddComicPageModule {}
