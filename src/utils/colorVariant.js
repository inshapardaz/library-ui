const VARIANT_COUNT = 6;

// Deterministic 1..6 variant index from an id, so repeated renders of the
// same item always pick the same cover gradient / masthead color.
export const variantIndex = (id) => {
    const n = Number(id) || 0;
    return (Math.abs(n) % VARIANT_COUNT) + 1;
};

export default variantIndex;
