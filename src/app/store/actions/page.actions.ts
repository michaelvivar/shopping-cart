export class PageTitle {
   static readonly type = '[PAGE] title';

   constructor(public payload: string) { }
}

export class ResetButtons {
   static readonly type = '[BUTTONS]  Reset'
}

export class BackButton {
   static readonly type = '[BUTTON] Back';

   constructor(public payload: { link: string, icon?: string }) { }
}

export class AddButton {
   static readonly type = '[BUTTON] Add';

   constructor(public payload: { link: string, icon?: string }) { }
}