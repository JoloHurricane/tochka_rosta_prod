function fullDateNow () {
    let days = [1,2,3,4,5,6,7,8,9]
    let date = new Date(Date.now())
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(days.includes(day)){
        day = `0${day}`
    }
     if (days.includes(month)){
        month =`0${month}`
    }
    let dateN = day+'/'+month+'/'+year
    
   return dateN
}

module.exports = fullDateNow