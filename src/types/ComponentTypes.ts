import { NewsItem } from "@/models/News.models";

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export interface EditNewsModalState {
  isOpen: boolean;
  news?: NewsItem;
}
