import { combineAll } from "rxjs/operators"

export interface IFirebaseError {
    code: string;
    message: string;
}
export interface IFirebaseObject {
    firebaseId?: string;
    firebaseTimestamp?: number;
}

export interface IMission extends IFirebaseObject {
    id: string;
    level: MissionLevel;
    title: string;
    description: string;
    companyProfit: number;
    userExperienceProfit: number;
    notifyTo: IUser;
    deliverTo?: IUser;
    startDate?: Date;
    maxDate?: Date;
    closeDate?: Date;
    category: missionCategory;
    state: missionState;
    group: string;
}

export enum missionState {
    started = 'Iniciada',
    finished = 'Terminada',
    canceled = 'Cancelada'
}

export enum missionCategory {
    legal = 'Legal',
    ilegal = 'Ilegal'
}

export interface IUser extends IFirebaseObject {
    nameInGame: string;
    name: string;
    email: string;
    password: string;
    ingameRole: IngameRole;
    role: UserRole;
    level: ILevel;
    experience: number;
    currentMissions?: IMission[];
    missionHistory?: IMission[];
    money: number;
    casesLS: number;
    casesSF: number;
    casesLV: number;
    inventory: IItem[];
    respect: number;
    connectionStatus: ConnectionStatus;
    withdrawRequest: IWithdrawRequest[]
}

export enum ConnectionStatus {
    Conectado = 'Conectado',
    Desconectado = 'Desconectado',
}

export enum StateOfWithdrawRequest {
    Completado = 'Completado',
    Pendiente = 'Pendiente',
}

export interface IWithdrawRequest extends IFirebaseObject {
    itemRequest: IItem | number;
    userWhoSent: string;
    userWhoReceiving: string;
    state: StateOfWithdrawRequest; 
    requestDate: Date;
}

export interface IItem extends IFirebaseObject {
    name: string;
    img: string;
    cost: number;
    pendingWithdrawal: boolean;
    userInChargeOfWithdrawal: string;
}

export enum IngameRole {
    Asistente = 'Asistente',
    Profesional = 'Profesional',
    Experto = 'Experto',
    JefeDeFinanzas = 'Jefe de Finanzas',
    Administrador = 'Administrador',
    Manager = 'Manager',
    Lider = 'Líder',
    CEO = 'CEO'
}

export enum UserRole {
    User = 'User',
    Worker = 'Worker',
    Admin = 'Admin'
}

export interface ILevel {
    level: number;
    totalExperience: number;
}

export interface ICasesRegister extends IFirebaseObject {
    person: string;
    case: string;
    winItem: string;
}
export interface IMissionRegister extends IFirebaseObject {
    person: string;
    level: number;
    experience: number;
}

export const Levels: ILevel[] = [
    { level: 1, totalExperience: 250 },
    { level: 2, totalExperience: 500 },
    { level: 3, totalExperience: 1000 },
    { level: 4, totalExperience: 1500 },
    { level: 5, totalExperience: 2000 },
    { level: 6, totalExperience: 2500 },
    { level: 7, totalExperience: 3000 },
    { level: 8, totalExperience: 3000 },
    { level: 9, totalExperience: 3000 },
    { level: 10, totalExperience: 3000 },
    { level: 11, totalExperience: 4000 },
    { level: 12, totalExperience: 4000 },
    { level: 13, totalExperience: 4000 },
    { level: 14, totalExperience: 4000 },
    { level: 15, totalExperience: 4000 },
    { level: 16, totalExperience: 4500 },
    { level: 17, totalExperience: 4500 },
    { level: 18, totalExperience: 4500 },
    { level: 19, totalExperience: 4500 },
    { level: 20, totalExperience: 4500 },
    { level: 21, totalExperience: 5000 },
    { level: 22, totalExperience: 5000 },
    { level: 23, totalExperience: 5000 },
    { level: 24, totalExperience: 5000 },
    { level: 25, totalExperience: 5000 },
    { level: 26, totalExperience: 5500 },
    { level: 27, totalExperience: 5500 },
    { level: 28, totalExperience: 5500 },
    { level: 29, totalExperience: 5500 },
    { level: 30, totalExperience: 5500 },
]

export enum UserLevel {
    one = 100,
    two = 200,
    three = 400,
    four = 800,
    five = 1600,
    six = 3200,
    seven = 6400,
    eight = 12800,
    nine = 25600,
    ten = 51200
}

export enum MissionLevel {
    one = "1",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
    six = "6",
    seven = "7",
    eight = "8",
    nine = "9",
    ten = "10"
}