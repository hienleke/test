import pathlib = require("path");
const sharp = require("sharp");

export class UtilHelper {
     public static toNonAccentVietnamese(str: String) {
          str = str.toLowerCase();
          str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return str;
     }

     public static resize(width: number, height: number, pathdirector: string, pathfile: string, filename: string) {
          sharp(pathfile)
               .resize(width, height, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
               })
               .toFile(pathdirector + "/" + +width + "_" + height + filename, function (err) {
                    if (err) {
                         console.error("sharp>>>", err);
                    } else console.log("done");
               });
     }
}
