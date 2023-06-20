import useSWR from 'swr';
const fetcher = (...args: any) => fetch(...args).then(res => res.json());
export const product = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:3004/sanphams`, fetcher)
    return {
        productData: data,
        productIsLoading: isLoading,
        productIsError: error
    }
}

export const user = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:3004/benhnhans`, fetcher)
    return {
        userData: data,
        userIsLoading: isLoading,
        userIsError: error
    }
}