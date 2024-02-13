import { useFetcher, useOutletContext } from "@remix-run/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import { IconChevronDown, IconChevronUp, IconFire } from "../svg";
import Spinner from "../ui/spinner";

const VoteButtons = ({ item }: { item: RoadmapItem }) => {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  const clickHandler =
    (voteType: string) =>
    (comment: string | undefined, email: string | undefined) => {
      const formData: any = { itemId: item.id, vote: voteType };
      comment && (formData.comment = comment);
      email && (formData.email = email);
      return fetcher.submit(formData, {
        action: `/roadmap/${item.id}/votes`,
        method: "post",
      });
    };

  return (
    <ul className="menu menu-compact bg-inherit rounded-box gap-1 items-center p-0 flex-col justify-start relative">
      {busy && (
        <div className="absolute inset-0 bg-base-300/30 z-50 rounded-lg">
          <Spinner />
        </div>
      )}
      <VoteButton
        item={item}
        voteType={"Urgent"}
        busy={busy}
        icon={<IconFire />}
        handleClick={clickHandler("Urgent")}
      />
      <VoteButton
        item={item}
        voteType={"Yes"}
        busy={busy}
        icon={<IconChevronUp />}
        handleClick={clickHandler("Yes")}
      />
      <VoteButton
        item={item}
        voteType={"Meh"}
        busy={busy}
        icon={<IconChevronDown />}
        handleClick={clickHandler("Meh")}
      />
    </ul>
  );
};

const VoteButton = ({
  item,
  voteType,
  busy,
  icon,
  handleClick,
}: {
  item: RoadmapItem;
  voteType: string;
  busy: boolean;
  icon: ReactElement;
  handleClick: any;
}) => (
  <div className="tooltip tooltip-right" data-tip={voteType}>
    <li className={`rounded-lg ${busy ? "disabled" : ""}`}>
      <VoteModalButton
        item={item}
        icon={icon}
        voteType={voteType}
        handleClick={handleClick}
      />
    </li>
  </div>
);

const VoteModalButton = ({
  item,
  voteType,
  icon,
  handleClick,
}: {
  item: RoadmapItem;
  voteType: string;
  icon: ReactElement;
  handleClick: any;
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  return (
    <>
      <label
        htmlFor={`vote-form-${item.id}-${voteType}`}
        className="modal-button px-1 md:px-4"
      >
        {icon}
      </label>

      <input
        type="checkbox"
        id={`vote-form-${item.id}-${voteType}`}
        className="modal-toggle"
      />
      <div className="modal text-left bg-base-300/80 p-0">
        <div className="modal-box rounded-lg">
          <label
            htmlFor={`vote-form-${item.id}-${voteType}`}
            className="btn btn-sm bg-error/80 hover:bg-error/100 border-none btn-circle block ml-auto text-white leading-8"
          >
            ✕
          </label>
          <>
            <h3 className="font-bold text-lg mb-2">{item.feature}</h3>
            <div className="col-span-full mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                E-mail(Optional)
              </label>
              <div className="mt-1">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 px-1.5 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="mail@example.com"
                    value={emailInput}
                    onChange={(event) =>
                      setEmailInput(event.currentTarget.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mt-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 "
              >
                Comments
              </label>
              <div className="mt-1">
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="block w-full rounded-md text-base border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Quick feedback on how this will help you or not"
                  value={commentInput}
                  onChange={(event) =>
                    setCommentInput(event.currentTarget.value)
                  }
                />
              </div>
            </div>
            <div className="modal-action flex items-center">
              {icon}
              <label
                htmlFor={`vote-form-${item.id}-${voteType}`}
                className={`btn ${
                  voteType === "Meh" ? "btn-error" : "btn-primary"
                }`}
                onClick={() => handleClick(commentInput)}
              >
                <span className="mr-1">Vote</span>
              </label>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default VoteButtons;
