import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";

export class ClientVote {
  constructor(
    readonly vote: string,
    readonly comment: string,
  ) { }
}

export class Vote {
  constructor(
    readonly vote: string,
    readonly comment: string,
    readonly email: string,
  ) { }

  static fromFirestore(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Vote {
    const data = snapshot.data();
    if (!data) {
      throw new Error("Invalid RoadmapItem");
    }
    return new Vote(
      data.vote,
      data.comment,
      data.email,
    );
  }

  static toClient(object: Vote): ClientVote {
    const { email, ...clientVote } = object;
    return {
      ...clientVote,
    };
  }
}
