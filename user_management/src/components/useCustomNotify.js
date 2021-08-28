import React from 'react';
import { useSnackbar } from 'notistack';

export const useCustomNotify = () => {
    const { enqueueSnackbar } = useSnackbar();
    
    function CustomNotify(message=null, type=null) {
        if (message !== null) {
            enqueueSnackbar(message, {
                anchorOrigin: { vertical: 'bottom',horizontal: 'right'},
                variant: type,
            })
        }
    }
    return CustomNotify;
}
