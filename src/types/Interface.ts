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
