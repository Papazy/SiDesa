export interface userType {
  email: string;
  id: number;
  is_active: boolean;
  is_admin: boolean;
  name: string;
  photo_url: string | null;
  saved_places: string[];
}