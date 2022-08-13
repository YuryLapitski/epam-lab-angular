import {User} from "./user";
import {GiftCertificate} from "./giftCertificate";

export class Order {
  id!: bigint;
  user!: User;
  giftCertificate!: GiftCertificate;
  price!: number;
  createDate!: string;
}
