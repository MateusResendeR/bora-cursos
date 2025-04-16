export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  rating: number;
  studentsCount: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
} 