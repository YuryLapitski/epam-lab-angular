import {Tag} from "./tag";

export class GiftCertificate {
  id!: bigint;
  name!: string;
  description!: string;
  price!: number;
  duration!: number;
  createDate!: string;
  lastUpdateDate!: string;
  image!: string;
  tagList!: Tag[];
}
