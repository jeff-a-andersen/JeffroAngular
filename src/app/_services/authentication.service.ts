import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        // return this.http.post<any>('/api/authenticate', { username: username, password: password })
        // return this.http.post<any>('https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts', { username: username, password: password })
        return this.http.post<any>('http://localhost:8080/token/generate-token', { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}