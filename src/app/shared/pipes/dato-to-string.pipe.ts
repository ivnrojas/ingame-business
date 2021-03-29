import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'datoToString'
})
export class DatoToStringPipe implements PipeTransform {

	transform(value: string, ...args: unknown[]): string {
		return new Date(value).toLocaleString();
	}

}
