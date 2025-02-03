export interface iSermon {
    title: string;
    audio: string | File;
    author: string;
}

export interface iGallery {
    gacImage: string | File;
}

export interface iGama {
    _id : string,
    name: string;
    phoneNumber: string;
    email: string;
    when: string;
    how : string;
    will: string;
}

export interface iMinisters {
    _id: string;
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    whatsapp?: string;
    city: string;
    state: string;
    country: string;
    gender: string; // Male or Female
    ministryCall: string; // Yes or No
    other?: string;
    whichMinistry: string;
    why: string;
    ayoAweMinImage: string | null;
}
