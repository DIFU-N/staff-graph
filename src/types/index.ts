type Department = {
    name: string,
    id: string, 
    createdAt: string, 
    updatedAt: string, 
    division: {}, 
    divisonId: string
}

export type Division = {
    name: string,
    id: string, 
    createdAt: string, 
    updatedAt: string, 
    departmentId: Department[]
}