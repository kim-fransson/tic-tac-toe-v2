import Button from "./Button";
import Restart from "../assets/icon-restart.svg?react";
import Switch from "./Switch";

export default function NewGame() {
  return (
    <div className="m-8 inline-flex flex-col gap-8">
      <Button>Primary Button</Button>
      <Button color="secondary">Secondary Button</Button>
      <Button color="neutral">Neutral Button</Button>
      <Button size="sm">Primary Button Small</Button>
      <Button color="secondary" size="sm">
        Secondary Button Small
      </Button>
      <Button color="neutral" size="sm">
        Secondary Button Small
      </Button>

      <Button color="neutral" size="icon">
        <Restart />
      </Button>

      <Switch />
    </div>
  );
}
