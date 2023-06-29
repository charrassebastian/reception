import { useState, useEffect } from 'react';
import { useFetch } from '../fetch/useFetch';

export function useCrud(elementName = 'element') {
    const [elements, setElements] = useState([]);
    const updateElement = updatedElement => useFetch('localhost:8082/api/' + elementName, 'patch', updatedElement);
    const deleteElement = elementId => useFetch('localhost:8082/api/' + elementName, 'delete', elementId);
    const addElement = newElement => useFetch('localhost:8082/api/' + elementName, 'post', newElement);
    useEffect(() => {
        const interval = setInterval(() => {
            const fetched = useFetch('localhost:8082/api/' + elementName);
            if (fetched && !(fetched instanceof Error)) {
                setElements(() => fetched);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    let res = {};
    let capitalizedElementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
    res[elementName + 'Collection'] = elements;
    res['update' + capitalizedElementName] = updateElement;
    res['delete' + capitalizedElementName] = deleteElement;
    res['add' + capitalizedElementName] = addElement;
    return res;
}
