export class AppUser {
   static readonly type = '[USER] Set';

   constructor(public payload: any) { }
}

export class RemoveAppUser {
   static readonly type = '[USER] Remove';
}