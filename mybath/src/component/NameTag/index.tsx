import { Button, Intent } from "@blueprintjs/core";

export const NameTag = (props: { name: string }) => {
  return (
    <div>
      <span>today is </span>
      <Button intent={Intent.WARNING} minimal={true} large={true}>
        {props.name}
      </Button>
    </div>
  );
};
