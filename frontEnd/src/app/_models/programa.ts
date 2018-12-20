export class Programa {
    
    id: number;
    id_fk_period_id: number;
    name: string;
    organizer: string;
    location: string
    status: number;
    type: number;

    datestart: Date;
    datefinisht: Date;
    
    constructor(
    ) { }
}