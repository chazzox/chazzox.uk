import { atom } from "nanostores";

type TagType = {
    [key: string]: boolean;
};

export const tags = atom<TagType>({});
export const addTag = (tagName: string) => {
    tags.set({ ...tags.get(), [tagName]: false });
};
export const toggleTag = (tagName: string) => {
    const currentTags = tags.get();
    tags.set({ ...currentTags, [tagName]: !currentTags[tagName] });
};
export const getActive = () => {
    return Object.entries(tags.get())
        .filter(([_, state]) => state == true)
        .map(([key, _]) => key);
};
