import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getLabelByIdInArrayToString'
})
export class GetLabelByIdInArrayToStringPipe implements PipeTransform {
    
    transform(value: any, list: Array<any>, keyValue: string, keyName: string) {
        let label = '';
        if (value && list) {
            let array = value?.split(',');
            array?.forEach((e: any) => {
                const item = list?.find(x => x[keyValue] === e);
                if (item) {
                    if (!label) {
                        label = item[keyName];
                    } else {
                        label = label.concat(', ' + item[keyName]);
                    }
                }

            });

            return label;
        }
        return '';
    }
}
