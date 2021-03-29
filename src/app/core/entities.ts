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
    level: number[];
    title: MissionTitle;
    description: string;
    companyProfit: number;
    userExperienceProfit: number;
    startDate?: Date;
    closeDate?: Date;
    category: MissionCategory;
    state: MissionState;
    userInChargeOfDelivery: string
    requiredLevel: number;
}

export enum MissionState {
    started = 'Iniciada',
    finished = 'Terminada',
    canceled = 'Cancelada'
}

export enum MissionTitle {
    EntregaDeArmas = 'Entrega de Armas',
    VentaDeArmas = 'Venta de Armas',
    EntregaDePiezas = 'Entrega de Piezas',
    NuevoPersonalEnLaBanda = 'Nuevo personal en la banda',
    EntregaDeConsumible = 'Entrega de Consumible',
    EntregaDeDinero = 'Entrega de Dinero', 
}

export enum MissionCategory {
    weaponNeeded = 'weaponNeeded',
    moneyNeeded = 'moneyNeeded',
    standard = 'standard'
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
    withdrawRequest: IWithdrawRequest[];
    generatedProfit?: number;
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
    itemRequest: IItem | number | IMission;
    userWhoSent: string;
    userWhoReceiving: string;
    state: StateOfWithdrawRequest; 
    requestDate: Date;
    requestType: RequestType;
}

export enum RequestType {
    Mission,
    Money,
    Item,
    Solicitud
}
export interface IItem extends IFirebaseObject {
    name: string;
    img: string;
    cost: number;
    pendingWithdrawal: boolean;
    userInChargeOfWithdrawal: string;
    case: string;
    rate: number;
    order: number;
    profit: number;
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
    date: Date;
    person: string;
    case: string;
    winItem: string;
}
export interface IMissionRegister extends IFirebaseObject {
    date: Date;
    person: string;
    level: number;
    experience: number;
    profit: number;
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