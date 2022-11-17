import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComicService } from '../services/comic.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  comicForm: FormGroup;
  updateComicFg: FormGroup;
   id: any;
  capturedPhoto: string = '';
  isSubmitted: boolean = false;

  constructor(
    private comicService: ComicService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.comicForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = '';
       
    
  }

  ngOnInit() {
    this.fetchComic(this.id);
    this.updateComicFg = this.formBuilder.group({
      comic: [''],
      autor: [''],
      filename:[''],      
    });
  }
 
  get errorControl() {
    return this.comicForm.controls;
  }
 
  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
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

      this.comicService.updateComic(this.comicForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/tabs/tab3");
      })
    }

  }
  fetchComic(id) {
    this.comicService.getComic(id).subscribe((data) => {
      this.updateComicFg.setValue({
        comic: data['comic'],
        autor: data['autor'],
        filename:data['filename'], 
      });
    });
  }

  onSubmit() {
    
    if (!this.updateComicFg.valid) {
      
      return false;
    } else {
      this.comicService
        .updateComic(this.id, this.updateComicFg.value)
        .subscribe(() => {
          this.updateComicFg.reset();
          this.router.navigate(['/tabs/tab3']);
        });
    }
  }
}