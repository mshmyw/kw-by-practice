type VerticalAlignment = 'top' | 'middle' | 'bottom';
type HorizontalAlignment = 'left' | 'center' | 'right';

// Takes
//   | "top-left"    | "top-center"    | "top-right"
//   | "middle-left" | "middle-center" | "middle-right"
//   | "bottom-left" | "bottom-center" | "bottom-right"

declare function setAlignment(
  value: `${VerticalAlignment}-${HorizontalAlignment}`
): void;

type Listenable<T> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};
declare function watch<T>(obj: T): T & Listenable<T>;
const foo: any = {};
foo.on("nameChanged", () => {});