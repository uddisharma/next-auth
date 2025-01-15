export type UserRole = 'Admin' | 'Contributor' | 'Viewer'

export type ExportType = "blog" | "question" | "contact" | "report" | "user" | "newsletter" | "leads"

export interface User {
    id: string
    name: string
    email: string
    avatar: string
    location: string
    joinedDate: string
    role: UserRole
}

