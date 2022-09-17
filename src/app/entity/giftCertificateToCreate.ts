import {TagToCreate} from "./tagToCreate";

export class GiftCertificateToCreate {
  name!: string;
  description!: string;
  duration!: number;
  price!: number;
  image!: string;
  tagList!: TagToCreate[];


  constructor(name: string,
              description: string,
              duration: number,
              price: number,
              image: string,
              tagList: TagToCreate[]) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.price = price;
    this.image = image;
    this.tagList = tagList;
  }
}
