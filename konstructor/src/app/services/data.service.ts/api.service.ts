import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IUser} from "../../models/user.type";
import {IRegister} from "../../models/register.type";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<any>('api/users')
      .pipe(map((res: any) => {
        return res;
      }))
  };

  registerUser(data: any): Observable<IRegister> {
    return this.http.post<any>('api/adduser', data)
      .pipe(map((res: any) => {
        return res;
      }))
  };

  updateScore(data: any): Observable<IUser> {
    return this.http.put<any>('api/updscore', data)
      .pipe(map((res: any) => {
        return res;
      }))
  };
}
