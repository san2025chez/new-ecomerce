export interface Product{
    id:string;
    images: image[];
    descriptions: string;
    price: number;
    name:string;


}
interface image{
    id:string;
    url: string;
}