import { Tip, Button } from "grommet";

export const NameTag = (props: { name: string }) => {
  //const nameColor = props.name === "james" ? "neutral-2" : "neutral-1";
  const nameColor = props.name === "james" ? "neutral-3" : "status-ok";

  return (
    <div>
      <span>today is </span>
      <Tip content={props.name}>
        <Button
          color={nameColor}
          label={props.name}
          style={{ backgroundColor: "yellow" }}
        />
      </Tip>
    </div>
  );
};
