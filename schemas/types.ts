export type UserRole = 'Admin' | 'Contributor' | 'Viewer'

export interface User {
    id: string
    name: string
    email: string
    avatar: string
    location: string
    joinedDate: string
    role: UserRole
}

