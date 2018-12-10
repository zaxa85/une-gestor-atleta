export class Member {
    
    id: number;
    firstname: string;
    lastname: string;
    dob: Date;
    datestart: Date;
    status: number;
    photoname: string;

    //Aditional information
    /*
        - dni
        - direccion
        - ubigeo
        - foto

    */



    //Extra information
    /*
        - FTP
        - Umbral FC
        - Peso
        - Kilometros por semana
        - Categoria actual

    */


    constructor(
    ) { }
    /*
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public dob: string,
        public datestart: string
    ) { }
    */
}