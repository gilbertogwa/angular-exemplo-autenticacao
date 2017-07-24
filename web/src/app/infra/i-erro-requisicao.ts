/**
 * Created by Gilberto on 15/03/2017.
 */

export interface IErroRequisicao {
	motivo?: string,
	codigo?: number ,
	isValidacao?: boolean,
	itensValidacao?: Array<{ item: string, errorList: Array<{ errorMessage: string, memberNames: Array<string> }> }>
}
