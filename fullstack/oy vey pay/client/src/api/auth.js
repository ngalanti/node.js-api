import api  from "./api";

export const signUp = async (payload) => {
    try {
       const {data} = await api.post('/sign-up',payload) 

       return data;
    } catch (error) {
        const message =
        error.response?.data.message || 'an erro occurred while signing up. please try agian.';
        
        throw new Error(message);
    }
};


export const signIn = async (payload) => {
    try {
       const {data} = await api.post('/sign-in',payload) 

       return data;
    } catch (error) {
        const message =
        error.response?.data.message || 'an erro occurred while signing in. please try agian.';
        
        throw new Error(message);
    }
};

export const logOut = async () => {
    try {
       await api.post('/log-out') 

       window.location.href = '/auth';
    } catch (error) {
        const message =
        error.response?.data.message || 'an erro occurred while loging out. please try agian.';
        
        throw new Error(message);
    }
};


export const me = async () => {
    try {
       const {data} = await api.get('/me') 

       return data;
    } catch (error) {
        const message =
        error.response?.data.message || 'an erro occurred while fetching userdata. please try agian.';
        
        throw new Error(message);
    }
};