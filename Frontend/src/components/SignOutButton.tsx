import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {

    const queryClient = useQueryClient();

    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async()=>{
            showToast({message: "Signed Out!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error:Error) =>{
            showToast({message: error.message, type: "ERROR"})
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return(
        <button 
        onClick = {handleClick}
        className="className=text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out">Sign Out</button>
    );
};

export default SignOutButton;