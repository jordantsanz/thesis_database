const difficulties = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

const choiceArray = {
//   EASY: [
//     'q', 'q', 'h', 'hr', 'hr', 'hr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'q', 'q', 'q', 'q', 'q', 'q', 'h', 'h', 'h', 'h',
//   ],
  EASY: [
    'qr', 'qr', 'hr', 'hr', 'hr', 'hr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'hr', 'hr', 'hr', 'hr',
  ],
  MEDIUM: [
    '16', '8', '8', '8', '8', 'qr', 'hr', 'qr', 'qr', 'qr', 'qr', 'qr', 'qr', 'q', 'q', 'q', 'q', 'q', 'q', 'qd', 'qd', 'h', 'h',
  ],
  HARD: [
    '16', '8d', '8', '8', '8', '8', '8', '8', '8', '8', 'qr', 'qr', 'qr', 'q', 'q', 'q', 'q', 'q', 'q', 'q', 'q', 'qd', 'h',
  ],
};

const bpmChoices = {
  EASY: 10,
  MEDIUM: 20,
  HARD: 40,
};

const errorCodes = {
  PLAYER_NOT_FOUND: 1,
  GAME_NOT_FOUND: 2,
  UNKNOWN: 3,
};

const MAX_LENGTHS_OF_PINS = 6;

const socketRoutes = {
  INIT_GAME_TEACHER: 'initGameTeacher',
  CHANGE_DIFFICULTY: 'changeDifficulty',
  INIT_GAME_STUDENT: 'initGameStudent',
  START_GAME: 'startGame',
  GUESS_ANSWER: 'guessAnswer',
  GUESS_ANSWER_RHYTHM: 'guessAnswerRhythm',
  NEXT_QUESTION: 'nextQuestion',
  END_GAME: 'endGame',
  END_QUESTION_FROM_TIME: 'endQuestionFromTime',
  DISCONNECT: 'manual-disconnect',
  REJOIN_GAME_STUDENT: 'rejoinGameStudent',
};

const NUMBER_OF_DATA_OBJECTS = 10;

export {
  difficulties,
  choiceArray,
  bpmChoices,
  socketRoutes,
  MAX_LENGTHS_OF_PINS,
  errorCodes,
  NUMBER_OF_DATA_OBJECTS,
};
