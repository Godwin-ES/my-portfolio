import part1 from "./projects/part-1.json";
import part2 from "./projects/part-2.json";
import part3 from "./projects/part-3.json";
import part4 from "./projects/part-4.json";
import type { Project } from "@/lib/project-types";

export const projects = [...part1, ...part2, ...part3, ...part4] as Project[];
