import type { VotesSummary } from "~/types";
import { User } from "./User";

export class RoadmapItem {
  constructor(
    readonly id: string,
    readonly feature: string,
    readonly description: string,
    readonly status: string,
    readonly targetRelease: Date,
    readonly votesSummary: VotesSummary,
    readonly createdBy: User,
    readonly updatedBy: User
  ) { }

  static toClient(roadmapItem: RoadmapItem): any {
    const { createdBy, updatedBy, ...clientRoadmapItem } = roadmapItem;
    return clientRoadmapItem;
  }
}
