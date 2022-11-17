import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicService } from '../services/comic.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.page.html',
  styleUrls: ['./add-comic.page.scss'],
})
export class AddComicPage implements OnInit {

  comicForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private comicService: ComicService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.comicForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.comicForm = this.formBuilder.group({
      comic: ['', [Validators.required]],
      autor: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.comicForm.controls;
  }

  takePhoto() {
      
      this.photoService.takePhoto().then(data => {
     this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
  
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    
    this.capturedPhoto = null;
  }

  async submitForm() {
  
    this.isSubmitted = true;
    if (!this.comicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.comicService.createComic(this.comicForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/list-comics");
      })
    }
  }
}
