export type IGradeModel = {
  id: number;
  mode: GradeType;
};

export enum GradeType {
  HOLLOW,
  FILL,
}
