import Button from "./Button";
import Restart from "../assets/icon-restart.svg?react";
import Switch from "./Switch";
import IconX from "../assets/icon-x.svg?react";

export default function NewGame() {
  return (
    <div className="m-8 inline-flex flex-col gap-8">
      <Button>Primary Button</Button>
      <Button color="secondary">Secondary Button</Button>
      <Button color="neutral">Neutral Button</Button>

      <Button color="neutral" size="icon">
        <Restart className="scale-75 md:scale-100" />
      </Button>

      <Button color="dark-slate" size="square">
        <IconX className="text-turquoise-500 scale-65 md:scale-100" />
      </Button>

      <Switch />
    </div>
  );
}
