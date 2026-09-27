import { Shelf } from "@prisma/client";

export const SHELF_LABEL: Record<Shelf, string> = {
  CURRENTLY_READING: "Currently Reading",
  WANT_TO_READ: "Want to Read",
  READ: "Read",
  DID_NOT_FINISH: "Did Not Finish",
};

export const SHELF_ORDER: Shelf[] = [
  "CURRENTLY_READING",
  "WANT_TO_READ",
  "READ",
  "DID_NOT_FINISH",
];
