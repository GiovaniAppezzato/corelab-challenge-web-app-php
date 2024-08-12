export interface ITimestamps {
  created_at: string;
  updated_at: string;
  deleted_at?: string; // If use soft delete in project.
}