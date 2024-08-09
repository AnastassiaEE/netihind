import { useEffect, useState } from 'react';
import { parse } from 'papaparse';

export default function useCsvParser(pathToFile: string, delimeter: string) {
    const [data, setData] = useState<{[key: string]: string}[]>([]);
    
    /**
     * When the component is initially rendered, the  file is converted into an array of T objects.
     */
    useEffect(() => {
        /**
         * Converts a csv file into an array of T objects .
         */
        const parseCsvFile = () => {
            parse(pathToFile, {
                header: true,
                download: true,
                skipEmptyLines: true,
                delimiter: delimeter,
                complete: (result: { data: {[key: string]: string}[]}) => {
                    setData(result.data);   
                }
            })
        }
        parseCsvFile();
    }, [])

    return {data}
}