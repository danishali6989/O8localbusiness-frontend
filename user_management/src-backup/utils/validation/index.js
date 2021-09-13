import { useSnackbar } from 'notistack';

export const Validation=(username,password)=>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    let errors={}
    if(!username){
        errors.username=" *UserName is required"
        enqueueSnackbar('I love hooks');


    }
    if(!password){
        errors.password="*password is required"

    }else if(password.length<6){
        errors.password="*Passord must be more than 6 character"

    }

    return errors;
}