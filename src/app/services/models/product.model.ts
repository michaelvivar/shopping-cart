import { Category } from "~/services/models/category.model";

export interface Product {
   id: any;
   name: string;
   price: number;
   details: string;
   status: boolean;
   ratings?: number;
   items?: Item[];
   category: string | Category;
}

export interface Item {
   id: any;
   price: number;
   color?: string;
   size?: string;
   pictures?: Picture[];
   status: boolean;
   selected?: boolean;
}

export interface Picture {
   id: any;
   url: string;
   filename: string;
   width?: number;
   height?: number;
}