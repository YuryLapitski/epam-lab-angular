import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageRelation} from "../entity/imageRelation";

const IMAGE_RELATION_URL = 'assets/image-relation.json'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getImage() {
    return this.httpClient.get<ImageRelation[]>(IMAGE_RELATION_URL);
  }
}
