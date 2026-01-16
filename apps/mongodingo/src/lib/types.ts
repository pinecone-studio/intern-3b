export interface Skill {
  id: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  majorId: string;
}

export interface Major {
  id: string;
  name: string;
  nameMn: string;
  description: string;
  descriptionMn: string;
  salary: string;
  salaryMn: string;
  jobOpenings: string;
  jobOpeningsMn: string;
  demandLevel: 'HIGH' | 'VERY_HIGH' | 'MEDIUM';
  demandLabel: string;
  icon: string;
  overview: string;
  overviewMn: string;
  category: string;
  suitableFor: string;
  advantages: string;
  challenges: string;
  futureScope: string;
  Skill: Skill[];
}

export interface MajorCardProps {
  major: Major;
  index: number;
}
