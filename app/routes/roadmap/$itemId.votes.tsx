import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createVote, getItem } from "~/api.server";
import ItemVotes from "~/components/roadmap/votes";
import ItemNavbar from "~/components/roadmap/item-navbar";
import Container from "~/components/ui/container";
import { RoadmapItem } from "~/models/RoadmapItem";
import { Vote } from "~/models/Vote";
import { notFound } from "remix-utils";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const item = await getItem({ itemId });
  if (!item) {
    throw notFound({ item });
  }

  return {
    item: RoadmapItem.toClient(item),
    votes: item.votes?.map((vote) => Vote.toClient(vote)) || [],
  };
};

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();
  const itemId = formData.get("itemId");
  const vote = formData.get("vote");
  const comment = formData.get("comment");
  const email = formData.get("email");

  await createVote({
    itemId,
    vote: {
      vote: vote as string,
      comment,
      email,
    },
  });
  return null;
};

export default function Votes() {
  const { item, votes } = useLoaderData();
  return (
    <Container>
      <ItemNavbar item={item} />
      <ItemVotes item={item} votes={votes} />
      <Outlet />
    </Container>
  );
}
