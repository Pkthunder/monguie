import { Injectable } from 'angular-core';
import { Http } from 'angular-http';

@Injectable()
class ApiService {
    constructor (http) {
        this.http = http;
    }

    getData () {
        return this.http.get('/sample').map(res => res.json()).toPromise();
    }
}
ApiService.parameters = [
    [ Http ]
];
export const ApiServiceProvider = {provide: 'ApiService', useClass: ApiService};