import { StorageEngine } from '@ngxs/storage-plugin';

export class MyStorageEngine implements StorageEngine {

   static Storage: any = {
      '@@STATE': {}
   };

   get length() {
      return Object.keys(MyStorageEngine.Storage).length;
   }

   getItem(key) {
      return MyStorageEngine.Storage[key];
   }

   setItem(key, val) {
      MyStorageEngine.Storage[key] = val;
   }

   removeItem(key) {
      delete MyStorageEngine.Storage[key];
   }

   clear() {
      MyStorageEngine.Storage = {};
   }

   key(index) {
      return Object.keys(MyStorageEngine.Storage)[index];
   }
}