export class CategoriaCreateDto {

    name: string;
    idSuperCategoria: number;

    constructor(name: string, idSuperCategoria: number) {
        this.name = name;
        this.idSuperCategoria = idSuperCategoria;
    }
}
