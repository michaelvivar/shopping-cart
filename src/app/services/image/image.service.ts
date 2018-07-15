import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { ImageUpload } from '~/services/models/image-upload.model';

@Injectable()
export class ImageService {

   constructor() { }

   async upload(image: ImageUpload) {
      return image;
   }

   delete(id: any): Promise<void> {
      return null;
   }
}