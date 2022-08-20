import {Tag} from "./tag";
import {TagToCreate} from "./tagToCreate";

export class GiftCertificateToCreate {
  name!: string;
  description!: string;
  duration!: number;
  price!: number;
  tagList!: TagToCreate[];


  constructor(name: string, description: string, duration: number, price: number, tagList: TagToCreate[]) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.price = price;
    this.tagList = tagList;
  }
}
