export const styleFont = {
    header: "Source Sans Pro",
    body: "PT Sans"
};

export const splitter = (string) => {
    let params = string.split("_");
    if (params[0] !== "header" && params[0] !== "body")
        return {
            font_size: 16,
            family: 'body',
            font_weight: "400"
        }
    else return {
        font_size: parseInt(params[1]),
        family: params[0],
        font_weight: params[2]
    }
};
