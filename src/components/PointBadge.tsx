import Badge from "./ui/Badge";

interface PriceBadgeProps {
  label: string;
  point: string;
  color: "primary" | "secondary" | "neutral";
}

export default function PointBadge({ label, point, color }: PriceBadgeProps) {
  return (
    <Badge
      color={color}
      noShadow
      className="flex flex-col items-center"
      size="lg"
    >
      <span className="text-center text-xs leading-4 tracking-[0.75px]">
        {label}
      </span>
      <strong className="text-center text-xl leading-6 font-bold tracking-[1.25px]">
        {point}
      </strong>
    </Badge>
  );
}
