const normalizeUser = (rawUser) => {
    return {
        ...rawUser,
        image: {
            url: rawUser.image?.url || "https://joeschmoe.io/api/v1/mail@ashallendesign.co.uk",
            alt: rawUser.image?.alt || "Default user image",
        },
        isBusiness: rawUser.isBusiness || false,
        isAdmin: rawUser.isAdmin || false,
    };
};

module.exports = { normalizeUser };