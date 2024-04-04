interface MessageState {
  id: number;
  createdAt: Date;
  createdBy: string;
  content: string;
}

interface Rating {
  id: number;
  messageId: string;
  createdAt: Date;
  type: string;
  content: string;
}

export type { MessageState, Rating };
