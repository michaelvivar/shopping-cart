import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { ImageUpload } from '~/services/models/image-upload.model';

@Injectable()
export class ImageStore {

   constructor(private storage: AngularFireStorage) { }

   async upload(image: ImageUpload) {
      const id = Math.random().toString(36).substring(2);
      const ref = this.storage.ref(id);
      const task = ref.put(image.file);
      const state = task.snapshotChanges().pipe(map(s => s.state));
      image.progress = task.percentageChanges();
      await task.then(snapshot => {
         image.$key = id;
      }, error => console.log(error));
      await ref.getDownloadURL().toPromise().then(path => {
         image.url = path;
      })
      return image;
   }

   delete(id: any) {
      return this.storage.ref(id).delete();
   }
}