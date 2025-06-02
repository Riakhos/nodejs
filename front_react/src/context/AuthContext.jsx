import { createContext, useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Créez un context d'authentification
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    // État pour suivre l'authentification
    const [isLoading, setIsLoading] = useState(false)

    // État pour stocker les informations utilisateur
    const [auth, setAuth] = useState(null) 

    // Utiliser le hook pour rediriger
	const navigate = useNavigate()
    
    useEffect(() => {
        isLoggedIn()
    }, [])    

    // Fonction de connexion
    const login = async (dataForm) => {
        setIsLoading(true)
        try {

            const { data, status } = await axios.post('http://localhost:8000/api/user/sign', dataForm)

            if (status === 200) {

                // Stoker les données de l'auth dans le localStorage
                localStorage.setItem('auth', JSON.stringify(data))

                // Met à jour l'état
                setAuth(data)

                // Rediriger vers la page d'accueil après la déconnexion
                navigate('/')

                // isLoading a false après authentification réussie
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const isLoggedIn = async () => {
        setIsLoading(true)

        // Récupéré les données de l'utilisateur depuis le localStorage
        const authData = localStorage.getItem('auth')

        // Met à jour l'état 'auth' avec les données récupérées dans le localStorage
        setAuth(authData ? JSON.parse(authData) : null)

        // isLoading a false après authentification réussie
        setIsLoading(false)
        try {
            
        } catch (error) {
            console.log(error.message)
        }
    }

    // Fonction de déconnexion
    const logout = () => {
        setIsLoading(true)

        // Réinitialise l'utilisateur
        setAuth(null)

        // Supprime le token
        localStorage.removeItem('auth')

        // Rediriger vers la page d'accueil après la déconnexion
		navigate('/')

        setIsLoading(false)
    }

    return(
        <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}