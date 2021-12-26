import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ITile} from "../models/tile.type";
import {adjacencyList} from "../models/adjacencyList.model";
import {IDetail} from "../models/detail.type";
import {AuthService} from "../services/auth.service";
import {IUser} from "../models/user.type";
import {Observable, Subscription} from "rxjs";
import {
  loadData,
  loadDataEffect,
  registerUser,
  registerUserEffect,
  updateScoreEffect
} from "../services/data.service.ts/user.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  gridTiles: ITile[] = [];
  details: IDetail[] = [
    {type: 'battery', active: true, direction: 'any'},
    {type: 'conductorX', active: false, direction: 'horizontal'},
    {type: 'conductorY', active: false, direction: 'vertical'},
    {type: 'lighter', active: false, direction: 'any'},
    {type: 'conductorXY', active: false, direction: 'any'},
  ];
  batteryCount: number = 0;
  conductorXYcount: number = 0;

  public userList$: Observable<IUser[]>;
  public userList: IUser[] = [];
  public currentPoints: number = 0;
  public _id: string = '';
  public currentUser: IUser = {_id: '', username: '', score: 0, password: ''};
  public newScoreReached: boolean = false;
  public scoreboardInterval: number = 0;
  scoreSub: Subscription;

  constructor(private auth: AuthService, private store: Store<{ users: IUser[] }>) {

    this._id = document.cookie.replace(/(?:(?:^|.*;\s*)_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    for (let i = 0; i < 54; i++) {
      this.gridTiles.push({type: 'none', active: false, id: i});
    }
    this.batteryCount = 3;
    this.conductorXYcount = 6;

    this.userList$ = store.pipe(select('users'));
    this.store.dispatch(loadDataEffect());

    this.scoreSub = this.userList$.subscribe((users: IUser[]) => {
      this.userList = [];
      for (let user of users) {
        this.userList.push(user);
        if (user._id === this._id) {
          this.currentUser = Object.assign({}, user);
        }
      }
      this.userList.sort(function (a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });

      //this.scoreboardInterval = setInterval(() => this.store.dispatch(loadDataEffect()), 3000);
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.scoreSub)
      this.scoreSub.unsubscribe()

    if (this.scoreboardInterval)
      clearInterval(this.scoreboardInterval)
  }

  printPos(e: any) {
    console.log(e);
  }

  incrementPoints() {
    this.currentPoints++;
    this.store.dispatch(loadDataEffect());

    if (this.currentPoints >= this.currentUser.score) {
      this.newScoreReached = true;

      let newUser = Object.assign({}, this.currentUser);
      newUser.score = this.currentPoints;

      this.store.dispatch(updateScoreEffect({data: newUser}));
    }
  }

  turnOnAdjacents(index: number) {
    for (let i = 0; i < 54; i++) {
      if (adjacencyList[index][i] === 1 && index !== i && this.gridTiles[i].type !== 'none') {

        if (this.gridTiles[index].active) {
          if (this.gridTiles[index].type === 'battery') {
            if (Math.abs(index - i) === 1 && this.gridTiles[i].direction === 'horizontal' && !this.gridTiles[i].active) {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (Math.abs(index - i) === 9 && this.gridTiles[i].direction === 'vertical') {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (this.gridTiles[i].type === 'conductorXY' && !this.gridTiles[i].active) {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (this.gridTiles[i].type === 'lighter' && !this.gridTiles[i].active) {
              this.incrementPoints();
              this.gridTiles[i].active = true;
            }
          }

          if (this.gridTiles[index].type === 'conductorY') {
            if (Math.abs(index - i) === 9 && (this.gridTiles[i].direction === 'vertical' || this.gridTiles[i].direction === 'any')
              && !this.gridTiles[i].active && this.gridTiles[i].type !== 'lighter') {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (Math.abs(index - i) === 9 && this.gridTiles[i].type === 'lighter' && !this.gridTiles[i].active) {
              this.incrementPoints();
              this.gridTiles[i].active = true;
            }
          }

          if (this.gridTiles[index].type === 'conductorX') {
            if (Math.abs(index - i) === 1 && (this.gridTiles[i].direction === 'horizontal' || this.gridTiles[i].direction === 'any')
              && !this.gridTiles[i].active && this.gridTiles[i].type !== 'lighter') {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (Math.abs(index - i) === 1 && this.gridTiles[i].type === 'lighter' && !this.gridTiles[i].active) {

              this.incrementPoints();
              this.gridTiles[i].active = true;
            }
          }

          if (this.gridTiles[index].type === 'conductorXY') {
            if (Math.abs(index - i) === 1 && this.gridTiles[i].direction === 'horizontal' && !this.gridTiles[i].active) {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (Math.abs(index - i) === 9 && this.gridTiles[i].direction === 'vertical' && !this.gridTiles[i].active) {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (this.gridTiles[i].type === 'conductorXY' && !this.gridTiles[i].active) {
              this.gridTiles[i].active = true;
              this.turnOnAdjacents(i);
            }
            if (this.gridTiles[i].type === 'lighter' && !this.gridTiles[i].active) {
              this.incrementPoints();
              this.gridTiles[i].active = true;
            }
          }

        }

        if (!this.gridTiles[index].active) {
          if (this.gridTiles[i].active) {
            this.turnOnAdjacents(i);
          }
        }

      }
    }
  }

  insertDetail(index: number, detail: IDetail) {
    if (this.gridTiles[index].type !== 'none') return;

    if (detail.type === 'battery') this.batteryCount--;
    if (detail.type === 'conductorXY') this.conductorXYcount--;

    this.gridTiles[index].active = detail.active;
    this.gridTiles[index].type = detail.type;
    this.gridTiles[index].direction = detail.direction;

    this.turnOnAdjacents(index);
  }

  onDetailDrop(e: any) {
    let tmp: any = document.elementsFromPoint(e.dropPoint.x, e.dropPoint.y);
    e.source.reset();

    if (tmp[3].className === 'spawn-area') return;

    let result = '';
    for (let i of tmp[3]['innerText']) {
      if (parseInt(i) || i == '0') {
        result += i;
      }
    }

    if (result.length > 2) return;

    let index = parseInt(result);

    for (let i of this.details) {
      if (i.type === e.source.element.nativeElement.id) {
        this.insertDetail(index, i);
      }
    }
  }

  resetGame() {
    this.currentPoints = 0;
    this.gridTiles = [];
    for (let i = 0; i < 54; i++) {
      this.gridTiles.push({type: 'none', active: false, id: i});
    }
    this.batteryCount = 3;
    this.conductorXYcount = 6;
    this.newScoreReached = false;
    this.store.dispatch(loadDataEffect());
  }

  public get authStatus(): boolean {
    return this.auth.logIn;
  }
}
