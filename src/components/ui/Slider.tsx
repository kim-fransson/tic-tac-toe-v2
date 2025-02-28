import { motion } from "motion/react";
import {
  Slider as AriaSlider,
  SliderProps as AriaSliderProps,
  Label,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import { tv } from "tailwind-variants";

interface SliderProps extends AriaSliderProps {
  label: string;
  className?: string;
}

const styles = tv({
  base: "bg-dark-slate-500 text-steel-500 rounded-xl px-4 py-2",
});

const MotionSliderThumb = motion.create(SliderThumb);

export default function Slider({ className, label, ...rest }: SliderProps) {
  return (
    <AriaSlider {...rest} className={styles({ className })}>
      <div className="flex">
        <Label className="text-sm font-bold tracking-[1px] uppercase">
          {label}
        </Label>
      </div>
      <SliderTrack className="relative h-7 w-full">
        {({ state }) => {
          const thumbPercent = state.getThumbPercent(0) * 100;

          return (
            <>
              {/* track */}
              <div className="border-dark-slate-400 absolute top-[50%] h-2.5 w-full translate-y-[-50%] rounded-full border-2 bg-none" />

              {/* fill with animation */}
              <motion.div
                className="absolute top-[50%] h-2.5 translate-y-[-50%] rounded-full bg-orange-500"
                animate={{ width: `${thumbPercent}%` }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              />

              {/* thumb with animation */}
              <MotionSliderThumb
                className="border-dark-slate-500 bg-steel-500 absolute top-[50%] size-7 rounded-full border-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-transparent md:size-5"
                animate={{ left: `${thumbPercent}%` }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              />
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
