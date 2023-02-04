import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    const [values, setValues] = useState<T>(() => {
        const item = localStorage.getItem(key);
        if(item) {
            const data = JSON.parse(item, (key, value) => {
                if(key === "dateIsTimeCreation" || key === "dateIsTimeModification") {
                    return new Date(value);
                }
                return value;
            });
            return data;
        }
        return initialValue;
    });

    const setValue = (value: T | ((val: T) => T)) => {
        const valueToStore = value instanceof Function ? value(values) : value;
        setValues(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [values, setValue];
}