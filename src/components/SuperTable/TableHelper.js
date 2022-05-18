/**
 * This function calculate the width of a string based on its length
 * @param {String} text
 * @param {String} font
 */
const getTextWidth = (text, font = "14px -apple-system") => {
   const canvas = document.createElement("canvas");
   const context = canvas.getContext("2d");
   context.font = font;
   const metrics = context.measureText(text);
   return Math.round(metrics.width + 80);
};

/**
 * This function calculates the width of each column based in all CELL VALUES
 * @param {Array} columns
 * @param {Array} source
 * @param {Number} maxWidthPerCell
 */
export const calculateTableWidth = (
   columns,
   maxWidthPerCell = 500
) => {
   let tableWidth = 0
   columns.forEach(column => {
      tableWidth += column.width ? column.width : maxWidthPerCell
   })
   return tableWidth;
};
