import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageRelation} from "../entity/imageRelation";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage() {
    return this.http.get<ImageRelation[]>('assets/image-relation.json');
  }
}
