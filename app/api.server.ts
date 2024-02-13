import { RoadmapItem } from "./models/RoadmapItem";
import { Vote } from "./models/Vote";

const builshipCaller = ({ method, options }: any) => {
  const BUILDSHIP_WORKFLOW_URL = process.env.BUILDSHIP_WORKFLOW_URL;
  if (BUILDSHIP_WORKFLOW_URL === undefined) throw new Error("ENV: BUILDSHIP_WORKFLOW_URL is not defined");

  return fetch(BUILDSHIP_WORKFLOW_URL, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, options })
  })
}

export async function listItems({ status }: { status: string | null }) {

  const { data: items, success, error } = await builshipCaller({
    method: "listItems",
    options: { status }
  })
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error })) as {
      data: RoadmapItem[] | undefined, error: any, success: boolean;
    }

  if (error) {
    console.error(error);
  }
  return items || [] as RoadmapItem[];
}

export async function getStatusOptions() {
  const { data: statusOptions, success, error } = await builshipCaller({
    method: "getStatusOptions",
  })
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error })) as {
      data: string[] | undefined, error: any, success: boolean;
    }

  if (error) {
    console.error(error);
  }
  return statusOptions || [] as string[];
}

export async function getItem({ itemId }: { itemId: string }) {

  const { data: item, error, success } = await builshipCaller({
    method: "getItem",
    options: {
      itemId,
    }
  })
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error })) as {
      data: RoadmapItem & { votes: Vote[] } | undefined, error: any, success: boolean;
    }

  if (error) {
    console.error(error);
  }
  return item || null as RoadmapItem & { votes?: Vote[] } | null;
}


export async function createVote({ itemId, vote }: { itemId: string, vote: Vote }) {
  const { success, error } = await builshipCaller({
    method: "createVote",
    options: {
      itemId,
      vote
    }
  }).then(res => res.json())
    .catch(error => ({ error })) as any;

  if (error) {
    console.error(error);
  }
  return { error, success };
}
