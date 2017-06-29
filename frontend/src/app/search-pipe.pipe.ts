import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from './iemployee';

@Pipe({
    name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

    transform(items: IEmployee[], nameSearch: string): IEmployee[] {
        if (items && items.length) {
            return items.filter(item => {
                if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
                    return false;
                }

                return true;
            })
        }
        else {
            return items;
        }
    }

}
