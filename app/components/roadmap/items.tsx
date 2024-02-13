import type { RoadmapItem } from "~/models/RoadmapItem";
import { IconEmptyClipboard } from "../svg";
import Item from "./item";

const Items = ({ items }: { items: RoadmapItem[] }) => {
  return (
    <div className="flex flex-col">
      {items.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-5 p-10 text-base-content">
          <IconEmptyClipboard className="w-12 h-12" />
          <span className="text-xl font-light">
            There's nothing to show here!
          </span>
        </div>
      )}
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Items;
