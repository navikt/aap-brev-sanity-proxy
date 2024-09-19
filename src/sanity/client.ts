import { createClient } from "@sanity/client";

import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  sanityReadToken,
} from "./env.js";

export const client = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion,
  token: sanityReadToken,
});
