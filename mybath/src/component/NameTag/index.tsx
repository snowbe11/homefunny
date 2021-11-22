import { Tag, Intent } from "@blueprintjs/core";

export const NameTag = (props: { name: string }) => {
  return (
    <div>
      <span>today is </span>
      <Tag
        intent={props.name === "james" ? Intent.PRIMARY : Intent.SUCCESS}
        large={true}
      >
        {props.name}
      </Tag>
    </div>
  );
};
