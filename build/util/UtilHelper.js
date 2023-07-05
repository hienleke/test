"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilHelper = void 0;
const sharp = require("sharp");
class UtilHelper {
    static toNonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return str;
    }
    static resize(width, height, pathdirector, pathfile, filename) {
        sharp(pathfile)
            .resize(width, height, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
            .toFile(pathdirector + "/" + +width + "_" + height + filename, function (err) {
            if (err) {
                console.error("sharp>>>", err);
            }
            else
                console.log("done");
        });
    }
}
exports.UtilHelper = UtilHelper;
