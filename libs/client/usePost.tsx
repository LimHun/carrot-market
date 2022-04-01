import { useState } from 'react';

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
    function post(data: any) {}
    return [post, { loading, data, error }];
}
