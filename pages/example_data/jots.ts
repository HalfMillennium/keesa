import moment from 'moment';

const getPrevDate = (count: number, unit: string) => {
  return moment().subtract(count,unit).format('MMM Do')
}

export const exampleRecentJotContents = [
  {
    name: "Project Notes",
    jotType: "text",
    createdDate: getPrevDate(1,'days'),
    updatedDate: getPrevDate(1,'days'),
    fileSize: "2KB",
    description: "Initial notes for the project, outlining the core features and timeline."
  },
  {
    name: "Team Meeting Recording",
    jotType: "audio",
    createdDate: getPrevDate(3,'days'),
    updatedDate: getPrevDate(3,'days'),
    fileSize: "10MB",
    description: "Audio recording from the team’s weekly sync-up meeting."
  },
  {
    name: "Design Sketch",
    jotType: "image",
    createdDate: getPrevDate(1,'weeks'),
    updatedDate: getPrevDate(1,'weeks'),
    fileSize: "3MB",
    description: "Early wireframe sketch of the homepage layout."
  },
  {
    name: "Development Checklist",
    jotType: "text",
    createdDate: getPrevDate(2,'weeks'),
    updatedDate: getPrevDate(2,'weeks'),
    fileSize: "500KB",
    description: "Checklist for the development team, outlining key tasks and deadlines."
  }
];