export type PostSession = {
  sessionId: string;
};

export type GetQuestions = {
  SetOne: { id: number; value: string; question: string }[];
  SetTwo: { id: number; value: string; question: string }[];
};

export type PostScores = {
  quizId: string;
};

export type GetPersonalValues = {
  personalValues: {
    description: string;
    id: string;
    name: string;
    shortDescription: string;
  }[];
  valueScores: {
    personalValue: string;
    score: number;
  }[];
};

export type PostRegister = {
  access_token: string;
  message: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    quiz_id: string;
    user_uuid: string;
  };
};

export type Login = {
  access_token: string;
  message: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    quiz_id: string;
    user_uuid: string;
  };
};

export type CreateConversation = {
  conversationId: string;
  message: string;
};

export type GetAllConversations = {
  conversationId: string;
  userA: {
    name: string;
    id: string;
    sessionId: string;
  };
  userB: {
    name: string;
  };
  state: number;
  userARating: number;
  consent: boolean;
  conversationTimestamp: string;
  alignmentScoresId: string;
}
