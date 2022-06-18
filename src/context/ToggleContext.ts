import { createContext } from "react";
import { ToggleHook } from "hooks/use-toggle";

export const ToggleContext = createContext<ToggleHook>(undefined);