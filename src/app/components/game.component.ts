import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnChanges, OnDestroy {

  games: Game[] = []
  @Input() gamesPerPage!: number
  pageIndex: number = 0
  sub$!: Subscription

  constructor(private gameSvc: GameService) {}

  previousPage() {

    console.log('nextPage >>>> ' + this.pageIndex)
    // console.log('pageIndex typeOf >>>> ' + typeof this.pageIndex)
    // console.log('gamesPerPages typeOf >>>> ' + typeof this.gamesPerPage)
    if (this.pageIndex - this.gamesPerPage >= 0) {
      this.pageIndex = this.pageIndex - this.gamesPerPage
    } else {
      this.pageIndex = 0
    }

    console.log('after previous button pressed >>>>' + this.pageIndex)
    this.sub$ = this.gameSvc.getAllGames(this.gamesPerPage, this.pageIndex)
        .subscribe(          
          (result: any) => this.games = result.games
        )
  }

  nextPage() {
    console.log('nextPage >>>> ' + this.pageIndex)
    // console.log('pageIndex typeOf >>>> ' + typeof this.pageIndex)
    // console.log('gamesPerPages typeOf >>>> ' + typeof this.gamesPerPage)
    this.pageIndex = this.pageIndex + this.gamesPerPage
    console.log('after next button pressed >>>>' + this.pageIndex)
    this.sub$ = this.gameSvc.getAllGames(this.gamesPerPage, this.pageIndex)
    .subscribe(          
      (result: any) => this.games = result.games
    )
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sub$ = this.gameSvc.getAllGames(this.gamesPerPage, this.pageIndex)
        .subscribe(          
          (result: any) => this.games = result.games
        )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
