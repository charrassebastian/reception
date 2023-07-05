import { useState } from 'react';
import { useFetch } from '../fetch/useFetch';
import { useQuery } from 'react-query';

export function useCrud(elementName = 'element') {
    const [elements, setElements] = useState([]);
    const baseUrl = 'localhost:8082/api/';
    const updateElement = updatedElement => useFetch(baseUrl + elementName, 'patch', updatedElement);
    const deleteElement = elementId => useFetch(baseUrl + elementName, 'delete', elementId);
    const addElement = newElement => useFetch(baseUrl + elementName, 'post', newElement);
    let { isLoading, isError, data, error } = useQuery([elementName], 
        async () => { 
            const res = await fetch(baseUrl + elementName);
            return res.data;
        },
        {
            refetchInterval: 1000
        });
    let res = {};
    let capitalizedElementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
    res[elementName + 'Collection'] = elements;
    res['update' + capitalizedElementName] = updateElement;
    res['delete' + capitalizedElementName] = deleteElement;
    res['add' + capitalizedElementName] = addElement;
    return res;
}
