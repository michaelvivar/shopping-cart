export interface User {
   type: 'user' | 'admin';
   id: any;
   provider: string;
   email?: string;
   username?: string;
   status: boolean;
}