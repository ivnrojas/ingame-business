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
    id: string;
    name: string;
    nickname: string;
    password: string;
    level: UserLevel;
    experience: number;
    nextLevel: UserLevel;
    currentMission?: IMission;
    missionRecords?: IMission[];
}

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