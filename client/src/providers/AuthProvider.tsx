import { useEffect } from 'react';
import { useUserStore } from '../store/UserStore';
import AuthService from '../services/AuthService';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

	const setIsAuth = useUserStore((state) => state.setIsAuth);
	const setIsLoading = useUserStore((state) => state.setIsLoading);
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setIsLoading(true)
			AuthService
				.refresh()
				.then(({ data }) => {
					setUser({
						id: data.id,
						email: data.email,
						name: data.name,
						surname: data.surname,
            nickname: data.nickname,
						role: data.role,
					})
					setIsAuth(true)
					localStorage.setItem('accessToken', data.accessToken)
				})
				.catch((e) => {
					setUser(null)
					setIsAuth(false)
					localStorage.removeItem('accessToken')
          console.log(e);
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
	},)

	return <>{children}</>
}

export default AuthProvider