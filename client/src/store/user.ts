import { create } from 'zustand'
import IUser from '../models/IUser'

interface IUserStore {
	user: IUser | null
	isLoading: boolean
	isAuthenticated: boolean
	isCheckingAuthFinished: boolean
	setUser: (user: IUser | null) => void
	setIsLoading: (isLoading: boolean) => void
	setIsCheckingAuthFinished: (isCheckingAuthFinished: boolean) => void
	setIsAuthenticated: (isAuthenticated: boolean) => void
	setCredentials: (credentials: {email: string, password: string}) => void
	removeCredentials: () => void
}
