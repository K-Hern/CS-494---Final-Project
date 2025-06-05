export type Budget = {
  id: string | undefined;
  userId: string | undefined;
  description: string;
  name: string;
  food: number;
  housing: number;
  retirement: number;
  transportation: number;
  entertainment: number;
  education: number;
  savings: number;
  miscellaneous: number;
};