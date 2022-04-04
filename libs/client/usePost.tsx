import { useState } from "react";

interface UsePostState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UsePostResult<T> = [(data: any) => void, UsePostState<T>];

export default function usePost<T = any>(url: string): UsePostResult<T> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<undefined | any>(undefined);
    const [error, setError] = useState<undefined | any>(undefined);
    function post(data: any) {
        setLoading(true);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json().catch(() => {}))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }
    return [post, { loading, data, error }];
}
