export interface Chat {
  participants: Array<Participant>,
  messages: Array<Message>,
  title: string
  isStillParticipant: boolean
  threadType: string
}

interface Participant {
  name: string
}

export interface Message {
  chatTitle: string,
  senderName: string,
  timestampMs: number,
  content: string
  type: string
}
