import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '~/shared';
import { Product, Item } from '~/services/models/product.model';
import { PageTitle, BackButton } from '~/store/actions/page.actions';
import { ImageUpload } from '~/services/models/image-upload.model';
import { ImageService } from '~/services/image/image.service';
import { ProductService } from '~/services/product/product.service';
import { Observable } from 'rxjs';

@Component({
   templateUrl: './product-images.template.html',
   styles: [
      '.delete-button { position: absolute; bottom: 10px; margin-left: auto; margin-right: auto; opacity: 0.8 }'
   ]
})
export class ProductImagesPage extends Page {

   constructor(
      private route: ActivatedRoute,
      private service: ProductService,
      private imageService: ImageService
   ) { super() }

   product: Product;
   item: Item;
   photos$: Observable<any>;

   ngOnInit() {
      this.product = this.route.snapshot.data['product'];
      this.item = this.product.items[0];
      this.photos$ = this.service.allImages(this.product.id, this.item.id);
      this.store.dispatch(new PageTitle('Images: ' + this.product.name));
      this.store.dispatch(new BackButton({ link: '/admin/product/items/' + this.product.id }));
   }

   images: ImageUpload[];

   upload(files: FileList) {
      this.images = [];
      for (let i = 0; i < files.length; i++) {
         const upload = new ImageUpload(files.item(i));
         this.images.push(upload);
         this.imageService.upload(upload).then(img => {
            this.service.addImage(
               this.product.id,
               this.item.id,
               img.$key,
               img.url
            )
         });
         this.subscription = upload.progress.subscribe(x => upload.state = x);
      }
   }

   confirmDelete(img: any) {
      this.confirm(
         `<img src="${img.url}" class="center" />`
         , { confirm: 'Delete', width: 600 }).then(o => {
            if (o) {
               this.imageService.delete(img.id);
               this.service.deleteImage(this.product.id, this.item.id, img.id).then(_ => {
                  this.openSnackBar('Image deleted!', 'close');
               })
            }
         })
   }
}