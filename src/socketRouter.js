import { socketRoutes } from './constants';

export default function determineSocketRoute(msg, pin, getGameFromData, removeGameFromData, other) {
  const game = getGameFromData(pin);
  if (game === undefined) {
    console.log('Error with retreiving the game');
    return 1;
  }
  console.log('msg:', msg);
  console.log('other', other);
  switch (msg) {
    // start game
    case socketRoutes.START_GAME:
      try {
        game.startGame();
      } catch (e) {
        console.log('Error with starting the game: ', e);
      }

      break;

    // change difficulty
    case socketRoutes.CHANGE_DIFFICULTY:
      try {
        console.log('change difficulty called with difficulty', other);
        game.changeDifficulty(other);
      } catch (e) {
        console.log('Error with changing difficulty: ', e);
      }
      break;

    // get info from player
    case 'getPlayerInfo':
      try {
        game.getPlayerInfo();
      } catch (e) {
        console.log('Error with getting player info: ', e);
      }

      break;

    // checks answer from student
    case socketRoutes.GUESS_ANSWER:
      try {
        game.checkAnswer(other, 'listening');
      } catch (e) {
        console.log('Error with checking the answer: ', e);
      }

      break;

    case socketRoutes.GUESS_ANSWER_RHYTHM:
      try {
        console.log(other, 'other from guess answer rhythm');
        game.checkAnswer(other, 'rhythm');
      } catch (e) {
        console.log('Error with checking the answer: ', e);
      }
      break;

    case 'endQuestion':
      try {
        game.endQuestion(other);
      } catch (e) {
        console.log('Error with ending the question: ', e);
      }
      break;

    case socketRoutes.NEXT_QUESTION:
      try {
        game.nextQuestion(other);
      } catch (e) {
        console.log('Error with going to next question: ', e);
      }
      break;

    case socketRoutes.END_GAME:
      try {
        game.endGame(pin, other, removeGameFromData);
      } catch (e) {
        console.log('Error with ending the game: ', e);
      }
      break;
    case socketRoutes.END_QUESTION_FROM_TIME:
      try {
        game.endQuestionFromTime(other);
      } catch (e) {
        console.log('Error with end question from time: ', e);
      }
      break;

    case socketRoutes.REJOIN_GAME_STUDENT:
      try {
        game.rejoinGameStudent(other);
      } catch (e) {
        console.log('Error with rejoining game for student', e);
      }
      break;
    default:
      console.log('Error: call unknown');
  }
  return 0;
}
