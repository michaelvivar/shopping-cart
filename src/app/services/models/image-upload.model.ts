import { Observable } from "rxjs";

export class ImageUpload {
   $key: string;
   readonly name: string;
   url: string;
   progress: Observable<number>;
   state: number;
   createdDate: Date;

   constructor(public file: File) {
      this.name = file.name;
   }
}