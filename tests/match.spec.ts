import Match from "../src/match";

describe("Tennis Scoring System", () => {
    let match: Match;
    beforeEach(() => {
        match = new Match("player 1", "player 2");
    })

    afterEach(() => {
        match = null;
    })

    function createScore(n: number, m: number ) {
        for (let i = 0; i < n; i++) {
            match.updateGameScore("player 1");
        }
        for (let i = 0; i < m; i++) {
            match.updateGameScore("player 2");
        }
    }

    describe("start the match", () => {
        it("with love all", () => {
            expect(match.score()).toBe("0-0, 0-0");
        });
    });

    describe('player1', () => {
        it("wins first ball shot", () => {
            match.pointWonBy("player 1");
            expect(match.score()).toBe("0-0, 15-0");
        });
        it("wins 3 consecutive ball shots", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe("0-0, 40-0");
        });
        it("wins first game", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe("1-0");
        });
        it("wins game on advantage", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 2");
            expect(match.score()).toBe('0-0, 15-15');

            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe('0-0, 40-15');

            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe('0-0, Deuce');

            match.pointWonBy("player 1");
            expect(match.score()).toBe('0-0, Advantage player 1');

            match.pointWonBy("player 1");
            expect(match.score()).toBe('1-0');
        });
 
        it("wins set", () => {
            createScore(6,5);
            expect(match.score()).toBe('7-5, player 1 wins set');
        });
        // it.only("tie breaker", () => {
        //     createScore(6,5);
        //     createScore(0,1);
        //     // match.pointWonBy("player 2");
        //     expect(match.score()).toBe('6-6, Tie Breaker');
        // });
    });

    describe('player2', () => {
        it("wins first ball shot", () => {
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-0, 0-15");
        });
        it("wins 3 consecutive ball shots", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-0, 0-40");
        });
        it("wins first game", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-1");
        });
        it("wins game on advantage", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 1");
            expect(match.score()).toBe('0-0, 15-15');

            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe('0-0, 15-40');

            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe('0-0, Deuce');

            match.pointWonBy("player 2");
            expect(match.score()).toBe('0-0, Advantage player 2');

            match.pointWonBy("player 2");
            expect(match.score()).toBe('0-1');
        });
        it("wins set", () => {
            createScore(5,6);
            expect(match.score()).toBe('5-7, player 2 wins set');
        });
    });


});

