const ADVANTAGE = "Advantage";
const DEUCE = "Deuce";
const ADDITIONAL_GAME = "wins with Additional game";
export default class Match {
    player1Score: number = 0;
    player2Score: number = 0;
    player1GameScore: number = 0;
    player2GameScore: number = 0;
    tieBreaker: boolean = false;
    tieBreakerScorePlayer1 = 0;
    tieBreakerScorePlayer2 = 0;

    constructor(private player1: string, private player2: string) { }

    pointWonBy(player: string): void {
        if (!this.tieBreaker) {
            if (player === this.player1) {
                this.player1Score++;
            } else {
                this.player2Score++;
            }
            // console.log(this.player1Score, "::", this.player2Score);
        } else {
            if (player === this.player1) {
                this.tieBreakerScorePlayer1++;
            } else {
                this.tieBreakerScorePlayer2++;
            }
        }


    }

    score(): string {
        // if (this.tieBreakerCheck()) {
        //     return this.setScore() + ", " + this.playerWithHighestScoreOnTieBreaker() + " " + "with Tie breaker";
        // }
        // if (this.isTieBreakerRequired()) {
        //     this.tieBreaker = true;
        //     return "Tie Breaker";
        // }
        // if (this.additionalGameRequired()) {
        //     return this.setScore() + ", " + this.playerWithHighestScore() + " " + ADDITIONAL_GAME;
        // }
        if (this.gameWinner()) {
            return this.setScore();
        }
        if (this.onAdvantage()) {
            return this.setScore() + ", " + ADVANTAGE + " " + this.playerWithHighestScore();
        }
        if (this.onDeuce()) {
            return this.setScore() + ", " + DEUCE;
        }

        return this.setScore() + ", " + this.gameScore(this.player1Score) + "-" + this.gameScore(this.player2Score);
    }

    tieBreakerCheck() {
        if (this.tieBreakerScorePlayer1 >= 7 && this.tieBreakerScorePlayer1 - this.tieBreakerScorePlayer2 >= 2) {
            this.updateGameScore(this.player1);
            return true;
        }
        if (this.tieBreakerScorePlayer2 >= 7 && this.tieBreakerScorePlayer2 - this.tieBreakerScorePlayer1 >= 2) {
            this.updateGameScore(this.player2);
            return true
        }
        return false;
    }

    isTieBreakerRequired() {
        if (this.player1Score >= 6 && this.player1Score - this.player2Score == 0) {
            return true;
        } else if (this.player2Score >= 6 && this.player2Score - this.player1Score == 0) {
            return true;
        } else {
            return false;
        }
    }

    additionalGameRequired() {
        if (this.player1Score >= 6 && this.player1Score == this.player2Score + 2) {
            this.updateGameScore(this.player1);
            return true;
        } else if (this.player2Score >= 6 && this.player2Score == this.player1Score + 2) {
            this.updateGameScore(this.player2);
            return true;
        } else {
            return false;
        }
    }

    onDeuce(): boolean {
        return (this.player1Score >= 3 && this.player1Score >= 3) && this.player2Score == this.player1Score;
    }

    onAdvantage() {
        if (this.player1Score >= 3 && this.player1Score == this.player2Score + 1)
            return true;
        if (this.player2Score >= 3 && this.player2Score == this.player1Score + 1)
            return true;
        return false;
    }

    playerWithHighestScore(): string {
        if (this.player1Score > this.player2Score) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    playerWithHighestScoreOnTieBreaker(): string {
        if (this.tieBreakerScorePlayer1 > this.tieBreakerScorePlayer2) {
            return this.player1;
        } else {
            return this.player2;
        }
    }


    gameWinner() {
        if (this.player1Score >= 4 && this.player1Score >= this.player2Score + 2) {
            this.updateGameScore(this.player1);
            return true;
        }
        if (this.player2Score >= 4 && this.player2Score >= this.player1Score + 2) {
            this.updateGameScore(this.player2);
            return true;
        }
        return false;
    }

    updateGameScore(player: string) {
        if (player === this.player1) {
            this.player1GameScore++;
        } else {
            this.player2GameScore++;
        }
    }

    gameScore(score: number): string {
        switch (score) {
            case 0:
                return "0";
            case 1:
                return "15";
            case 2:
                return "30";
            case 3:
                return "40";
        }
    }

    setScore() {
        return this.player1GameScore + "-" + this.player2GameScore;
    }
}