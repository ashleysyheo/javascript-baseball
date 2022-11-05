const MissionUtils = require('@woowacourse/mission-utils');
const CalculateGame = require('./CalculateGame');
const generateRandomComputerNumber = require('./generateRandomComputerNumber');

class Game {
  constructor() {
    this.gameCount = 0;
    this.computerNumber;
  }

  start() {
    this.computerNumber = generateRandomComputerNumber();
    this.gameCount += 1;

    if (this.gameCount === 1) MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

    this.getUserInputNumber();
  }

  getUserInputNumber() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (input) => {
      this.validateUserInputNumber(input);
      this.getResult(input);
    });
  }

  getResult(userInputNumber) {
    const gameCalculator = new CalculateGame(this.computerNumber, userInputNumber);

    MissionUtils.Console.print(gameCalculator.getResult());

    if (gameCalculator.checkSuccess()) {
      MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
      this.askRestart();
    } else {
      this.getUserInputNumber();
    }
  }

  askRestart() {
    MissionUtils.Console.readLine(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n',
      (input) => {
        // decide reset based on user input
      }
    );
  }

  validateUserInputNumber(input) {
    const INPUT_SET = new Set(input.split(''));

    if (INPUT_SET.size !== 3 || !/^[1-9]+$/g.test(input) || input.length !== 3) {
      throw new Error('조건에 맞는 숫자를 다시 입력해주세요!');
    }

    return true;
  }
}

module.exports = Game;
