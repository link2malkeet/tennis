const ADVANTAGE = "Advantage";
const DEUCE = "Deuce";
// const ADDITIONAL_GAME = "wins additional game";
const WINS_SET = "wins set";
export default class Match {
    player1Score: number = 0;
    player2Score: number = 0;
    player1GameScore: number = 0;
    player2GameScore: number = 0;
    player1SetScore: number = 0;
    player2SetScore: number = 0;
    tieBreaker: boolean = false;
    tieBreakerScorePlayer1 = 0;
    tieBreakerScorePlayer2 = 0;

    constructor(private player1: string, private player2: string) { }

    pointWonBy(player: string): void {
        if (player === this.player1) {
            this.player1Score++;
        } else {
            this.player2Score++;
        }
    }

    score(): string {
        if (this.onSetWin()) {
            return this.setScore() + ", " + this.playerWithHighestGameScore() + " " + WINS_SET;
        }
        if (this.onGameWin()) {
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

    onSetWin() {
        if (this.player1GameScore >= 6 && this.player1GameScore == this.player2GameScore + 1) {
            this.updateGameScore(this.player1);
            return true;
        } else if (this.player2GameScore >= 6 && this.player2GameScore == this.player1GameScore + 1) {
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

    playerWithHighestGameScore(): string {
        if (this.player1GameScore > this.player2GameScore) {
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


    onGameWin() {
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

    updateSetScore(player: string) {
        if (player === this.player1) {
            this.player1SetScore++;
        } else {
            this.player1SetScore++;
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