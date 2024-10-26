import moment from 'moment';

const getPrevDate = (count: number, unit: string): string => {
  return moment().subtract(count, unit as moment.unitOfTime.DurationConstructor).format('MMM Do');
};

export enum DocTypeEnum {
  DRAWING = "drawing",
  AUDIO = "audio"
}

export interface DocDetails {
  name: string;
  docType: DocTypeEnum;
  createdDate: string;
  updatedDate: string;
  fileSize: number; // in number of bytes
  description: string;
}

export const exampleRecentDocContents: DocDetails[] = [
  {
    name: "Project Notes",
    docType: DocTypeEnum.DRAWING,
    createdDate: getPrevDate(1, 'days'),
    updatedDate: getPrevDate(1, 'days'),
    fileSize: 2048, // 2KB in bytes
    description: "Initial notes for the project, outlining the core features and timeline."
  },
  {
    name: "Team Meeting Recording",
    docType: DocTypeEnum.AUDIO,
    createdDate: getPrevDate(3, 'days'),
    updatedDate: getPrevDate(3, 'days'),
    fileSize: 10485760, // 10MB in bytes
    description: "Audio recording from the team’s weekly sync-up meeting."
  },
  {
    name: "Design Sketch",
    docType: DocTypeEnum.DRAWING,
    createdDate: getPrevDate(1, 'weeks'),
    updatedDate: getPrevDate(1, 'weeks'),
    fileSize: 3145728, // 3MB in bytes
    description: "Early wireframe sketch of the homepage layout."
  },
  {
    name: "Development Checklist",
    docType: DocTypeEnum.DRAWING,
    createdDate: getPrevDate(2, 'weeks'),
    updatedDate: getPrevDate(2, 'weeks'),
    fileSize: 1024, // 1KB in bytes
    description: "Checklist of development tasks and milestones."
  }
];