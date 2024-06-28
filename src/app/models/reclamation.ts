export interface Reclamation {
    _id: string;  // MongoDB ObjectID as string
    idClient: string;  // MongoDB ObjectID as string
    idCategorieReclamation: string;  // MongoDB ObjectID as string
    title: string;
    description: string;
    priorite: 'low' | 'medium' | 'high';  // Assuming priority can only be low, medium, or high
    dateReclamation: Date;
    statut_rec: string;  // Assuming status can be new, in progress, or resolved
    notes: string;
    notification: string;
    satisfaction: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  