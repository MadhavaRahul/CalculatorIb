import { Injectable } from '@angular/core';
import { AuthSvcService } from './auth-svc.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private auth: AuthSvcService) { }
  private ensureAuthenticated(){
    if(!this.auth.isAuthenticated()){
      throw new Error('User not logged in');
    }
  }
  private getStorageKey(): string | null {
    const user = this.auth.getUser();
    return user ? `calciHistory_${user.email}` : null;
  }
  getHistory():any[]{
    const key = this.getStorageKey();
    if(!key) return [];
    return JSON.parse(sessionStorage.getItem(key)||'[]');
  }
  addHistory(item: any){
    const key = this.getStorageKey();
    if(!key) return
    const history=this.getHistory();
    history.unshift(item);
    sessionStorage.setItem(key, JSON.stringify(history))
  }

  clearHistory(){
    this.ensureAuthenticated();
    const key = this.getStorageKey();
    // if(!key) return;
    sessionStorage.removeItem(key!);
  }
}
