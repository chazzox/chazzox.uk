import { atom } from "nanostores";
import { getCollection, type CollectionEntry } from "astro:content";

type TagType = {
    [key: string]: boolean;
};

export const tags = atom<TagType>({});

export const posts = atom(await getCollection("blogs"));

export const toggleTag = (tagName: string) => {
    const currentTags = tags.get();
    tags.set({ ...currentTags, [tagName]: !currentTags[tagName] });
};

const postListToTags = (
    posts: CollectionEntry<"blogs">[],
    defaultValue: boolean
): TagType => {
    return new Set(posts.map((v) => v.data.tags?.map((t) => t.id) || []).flat())
        .keys()
        .reduce(
            (previousTags, currentTag) => ({
                ...previousTags,
                [currentTag]: defaultValue
            }),
            {}
        );
};

export const setMatchingTags = (slug: string[]) => {
    if (slug.length == 0) {
        tags.set(postListToTags(posts.get(), true));
        return;
    }
    const matchingPosts = posts.get().filter((post) => {
        return slug.filter((s) => post.id.startsWith(s)).length > 0;
    });

    posts.set(matchingPosts);

    tags.set(postListToTags(matchingPosts, true));
};
