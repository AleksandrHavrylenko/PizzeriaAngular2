import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bucket } from '../models/bucket';
import { BucketAdd} from '../models/bucket-add'

@Injectable()
export class BucketService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private pizzasUrl = 'http://localhost:8080/api/v1/buckets';  // URL to web api
  constructor(private http: Http) { }

  create(bucket: BucketAdd): Promise<Bucket> {
    const url = `${this.pizzasUrl}`;
    return this.http.post(url, bucket, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log(`bucket create JSON: ${JSON.stringify(response.json())}`);
        return response.json().buckets[0] as Bucket;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


