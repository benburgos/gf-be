function compareObj(original, copy) {
    for (let [key, value] of Object.entries(original)) {
        if (typeof value === "object" && value !== null) {
            if (!copy.hasOwnProperty(key)) {
                copy[key] = value;
            } else {
                compare(value, copy?.[key])
            }
        } else {
            if (Object.is(value, copy?.[key])) {
                delete copy?.[key]
            }
        }
    }
    return copy
}

module.exports = {
  compareObj,
};
