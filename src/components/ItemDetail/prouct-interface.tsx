export interface Product{
id:string;
    images: Image[],
price:number,
name:string,
descriptions:string
}

export interface Image{
    url: string,
    id: string
}