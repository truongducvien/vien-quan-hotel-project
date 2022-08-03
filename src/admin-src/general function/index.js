const toVND = function (number) {
   const string = number.toString();
   const length = string.length;
   const a = Math.floor(length/3)
   const b = length%3

   let result = '';
   for(let i = 1; i <= a; i++){
      result = `${string.substr(length - i*3,3)},${result}`
   }
   result = `${string.substr(0, b)},${result}`
   if( result.indexOf(',') == 0){
      result = result.substr(1)
   }
   if( result.lastIndexOf(',') == result.length - 1){
      result = result.substr(0,result.length - 1)
   }
   return `${result} VND`
};

export { toVND }