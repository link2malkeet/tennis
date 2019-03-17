import Match from "../src/match";

describe("Tennis Scoring System", () => {
    let match: Match;
    beforeEach(() => {
        match = new Match("player 1", "player 2");
    })

    afterEach(() => {
        match = null;
    })

    describe("start the match", () => {
        it("with love all", () => {
            expect(match.score()).toBe("0-0, 0-0");
        });
    });

    describe('player1', () => {
        it("wins first ball game", () => {
            match.pointWonBy("player 1");
            expect(match.score()).toBe("0-0, 15-0");
        });
        it("wins 3 consecutive ball games", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe("0-0, 40-0");
        });
        it("wins first set", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            expect(match.score()).toBe("1-0");
        });
        it("wins set on advantage", () => {
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
        it.skip("wins after additonal game", () => {
            match.pointWonBy("player 1");//1
            match.pointWonBy("player 2");//1
            expect(match.score()).toBe('0-0, 15-15');

            match.pointWonBy("player 1");//2
            match.pointWonBy("player 1");//3
            expect(match.score()).toBe('0-0, 40-15');

            match.pointWonBy("player 2");//2
            match.pointWonBy("player 2");//3
            expect(match.score()).toBe('0-0, Deuce');

            match.pointWonBy("player 1");//4
            expect(match.score()).toBe('0-0, Advantage player 1');

            match.pointWonBy("player 1");//5
            match.pointWonBy("player 2");//4
            match.pointWonBy("player 2");//5
            match.pointWonBy("player 1");//6
            match.pointWonBy("player 1");//7
            expect(match.score()).toBe('1-0, player 1 wins with Additional game');
        });
        it.skip("wins after tie-breaker game", () => {
            match.pointWonBy("player 1");//1
            match.pointWonBy("player 2");//1
            expect(match.score()).toBe('0-0, 15-15');

            match.pointWonBy("player 1");//2
            match.pointWonBy("player 1");//3
            expect(match.score()).toBe('0-0, 40-15');

            match.pointWonBy("player 2");//2
            match.pointWonBy("player 2");//3
            expect(match.score()).toBe('0-0, Deuce');

            match.pointWonBy("player 1");//4
            expect(match.score()).toBe('0-0, Advantage player 1');

            match.pointWonBy("player 1");//5
            match.pointWonBy("player 2");//4
            match.pointWonBy("player 2");//5
            match.pointWonBy("player 1");//6
            match.pointWonBy("player 2");//6

            console.log(match.score());

            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            console.log(match.score());
            

            expect(match.score()).toBe('1-0, player 1 wins with Additional game');
        })
    });

    describe('player2', () => {
        it("wins first ball game", () => {
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-0, 0-15");
        });
        it("wins 3 consecutive ball games", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-0, 0-40");
        });
        it("wins first set", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            expect(match.score()).toBe("0-1");
        });
        it("wins set on advantage", () => {
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
        it.skip("wins after additonal game", () => {
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

            match.pointWonBy("player 2");//5
            match.pointWonBy("player 1");//4
            match.pointWonBy("player 1");//5
            match.pointWonBy("player 2");//6
            match.pointWonBy("player 2");//7
            expect(match.score()).toBe('0-1, player 2 wins with Additional game');
        })
    });


});