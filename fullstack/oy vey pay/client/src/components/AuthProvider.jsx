import {createContext} from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import {me} from '../api/auth'


const AuthContext = createContext();


export const AuthProvider = ({}) => {
const [user, setUser] = useState(null);
const [isPending, setIsPending] = useState(true);

const navigate = useNavigate();

const isTokenExpired = (decodedToken) => {
    try {
        const currentTime=math.floor(Date.now()/1000);
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
        
    }
}

const checkAuth = async () => {
    try {
        const data = await me()
        if(isTokenExpired(data) || !data){
            throw new Error('token expired')
        }
    } catch (error) {
        setUser(null);
        navigate('/login');
    }finally{
        setIsPending(false);
    }
}
}