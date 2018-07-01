import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SetAppUser } from '~store/actions/app.actions';

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwOTZhZDZmZjdjMTIwMzc5MzFiMGM0Yzk4YWE4M2U2ZmFkOTNlMGEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2luZW1heC1kYiIsIm5hbWUiOiJNaWtlIFZpdmFyIiwicGljdHVyZSI6Imh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLzE3ODIwNTcxNjIxMTUxOC9waWN0dXJlIiwiYXVkIjoiY2luZW1heC1kYiIsImF1dGhfdGltZSI6MTUzMDE3MDA1NiwidXNlcl9pZCI6ImVMV3F4TjZSZldZNEtEa3FKVkdXZWxkQWs5SzIiLCJzdWIiOiJlTFdxeE42UmZXWTRLRGtxSlZHV2VsZEFrOUsyIiwiaWF0IjoxNTMwMTcwMDU2LCJleHAiOjE1MzAxNzM2NTYsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjE3ODIwNTcxNjIxMTUxOCJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.QyrJfiVqc4lvAHDK6IQGcdlxnqO4uPE23Mutw4LpY82dhKTcsvPT0b49cP5i8L9x-OGQ_ncIKMJ1se8CcRf6wM3vXUtOMhXTmDU10zJ_6bdcLTtZaNIcjt87lkPOXctU_UKtnLFn_spkKtkmfQciW9joI-4l7WG9dYydUkknzHVIq57nBU5B76L3aXrX_YsGLRvnYfCneRBx5fnbGyim_eyd5uXHg7W-z7zXgUe8wNYzhRW38K_7w0pzyedpJ2Pz-JYaEHjri79uRd9qnoCEr1pVBkB8MIHPkfatDKcXlBYsKwJgeSvocdhglogoeum0DlZRPiTTWr_yN7bq1i-Jbw";

@Injectable({ providedIn: 'root' })
export class UserService {

   constructor(private http: HttpClient, private store: Store) { }

   get(id: any) {
      return this.http.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyClSzDmPWq6OI12OtqOZzjhrmwqWwSGRJY&idToken=' + token, {});
   }

   login(username: string, password: string) {
      this.store.dispatch(new SetAppUser({ username: username, type: 'admin' }));
      const promise = new Promise(resolve => {
         return resolve(true);
      })
      return promise;
   }

}