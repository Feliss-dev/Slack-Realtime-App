import {useMutation} from "convex/react";

import {api} from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";

import Error from "next/error";

type ResponseType = string | null;

type Options = {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};

export const useGenerateUploadUrl = () =>{
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);

    // const [isPending, setIsPending] = useState(false);
    // const [isSuccess, setIsSuccess] = useState(false);
    // const [isError, setIsError] = useState(false);
    // const [isSettled, setIsSettled] = useState(false);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.upload.generateUploadUrl);

    const mutate = useCallback(async (_values: "", option?: Options) => {
        try{
            setData(null);
            setError(null);
            setStatus("pending");

            const response = await mutation();
            option?.onSuccess?.(response);
            return response;
        }catch(error){
            setStatus("error");
            option?.onError?.(error as Error);
            if(option?.throwError){
                throw error;
            }
        }finally{
            setStatus("settled");
            option?.onSettled?.();
        }
    }, [mutation]);

    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,

    };
};