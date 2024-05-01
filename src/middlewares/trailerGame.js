
const urlFix = async(req, res, next) => {
    const urlTrailer = req.body.gameTrailer;
    if(urlTrailer){
        const startIndex = urlTrailer.indexOf("watch?v=");
        if(startIndex !== -1){
            const endIndex = urlTrailer.indexOf("&", startIndex);
            const videoId = urlTrailer.substring(startIndex + 8, endIndex !== -1 ? endIndex : undefined);
            const newUrl =  "https://www.youtube.com/embed/" + videoId;
            req.body.gameTrailer = newUrl;
            return next();
        }else{
            return next();
        }
    }else{
        return res.json("Error dont arrive urlTrailer :c")
    }
}
module.exports = urlFix;