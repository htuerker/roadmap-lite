import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";
import {
  IconChevronDown,
  IconChevronUp,
  IconEmptyClipboard,
  IconFire,
} from "../svg";

const Votes = ({ item, votes }: { item: RoadmapItem; votes: Vote[] }) => {
  const comments = votes.filter((vote) => !!vote.comment);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1 px-1 pt-2 md:pl-6 my-2">
        <span className="text-md">Description </span>
        <span className="text-sm font-light my-2">{item.description} </span>
      </div>
      <div className="flex flex-col px-1 pt-2 md:pl-6 my-2">
        <div className="h-12 flex items-center gap-2">
          <span className="inline-flex items-center gap-x-1.5 rounded-full px-4 py-1 font-medium bg-primary text-primary-content">
            {item.votesSummary.Urgent ?? 0}
            <IconFire className="w-8 h-8 rounded-lg py-1" />
          </span>
          <span className="inline-flex items-center gap-x-1.5 rounded-full px-4 py-1 font-medium bg-primary text-primary-content">
            {item.votesSummary.Yes ?? 0}
            <IconChevronUp className="w-8 h-8 rounded-lg p-1" />
          </span>
          <span
            className="inline-flex items-center gap-x-1.5 rounded-full px-4 py-1 font-medium bg-primary text-primary-content"
            style={{ backgroundColor: "#f87272" }}
          >
            {item.votesSummary.Meh ?? 0}
            <IconChevronDown className="w-8 h-8 text-xl text-primary-content rounded-lg p-1" />
          </span>
        </div>
      </div>
      {comments.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-5 p-10 text-base-content">
          <IconEmptyClipboard className="w-12 h-12" />
          <span className="text-xl font-light">No Comments Yet!</span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 px-1 pt-2 md:pl-6 my-2">
          <span className="text-md">Comments </span>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex w-full overflow-hidden border-b-1 border-b-base-300 py-2 gap-1"
            >
              <div className="py-1">
                <div className="flex justify-center items-center w-10 h-100/14 text-primary-content rounded-lg relative inset-y-1/2 -translate-y-1/2">
                  {comment.vote === "Urgent" && (
                    <IconFire className="w-8 h-8 text-sm bg-primary text-primary-content rounded-lg py-1" />
                  )}
                  {comment.vote === "Yes" && (
                    <IconChevronUp className="w-8 h-8 text-sm bg-primary text-primary-content rounded-lg py-1" />
                  )}
                  {comment.vote === "Meh" && (
                    <IconChevronDown
                      className="w-8 h-8 text-xl bg-secondary text-primary-content rounded-lg p-1"
                      style={{ backgroundColor: "#f87272" }}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center pl-1">
                <div>{comment.comment ?? `Voted ${comment.vote}!`}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Votes;
